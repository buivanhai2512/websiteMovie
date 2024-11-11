import Country from "../models/Country";
import { StatusCodes } from "http-status-codes";
import Movies from "../models/Movies";

// Lấy tất cả quốc gia
export const getCountrys = async (req, res) => {
    try {
        const Countrys = await Country.find();
        if (Countrys.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có quốc gia nào!" });
        }
        res.status(StatusCodes.OK).json(Countrys);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

// Lấy quốc gia theo slug
export const getCountrysbySlug = async (req, res) => {
    try {
        const country = await Country.findOne({ slug: req.params.slug }); // Sử dụng slug để tìm quốc gia
        if (!country) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy quốc gia!" });
        }
        res.status(StatusCodes.OK).json(country);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

// Thêm quốc gia mới
export const addCountry = async (req, res) => {
    try {
        // Kiểm tra nếu quốc gia đã tồn tại dựa trên tên
        const existingCountry = await Country.findOne({ name: req.body.name });

        if (existingCountry) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Quốc gia đã tồn tại." });
        }
        // Nếu quốc gia chưa tồn tại, tiến hành thêm mới
        const newCountry = new Country(req.body);
        await newCountry.save();

        res.status(StatusCodes.CREATED).json(newCountry);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Cập nhật quốc gia dựa trên slug
export const updateCountry = async (req, res) => {
    try {
        const updatedCountry = await Country.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }); // Sử dụng slug
        if (!updatedCountry) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy quốc gia!" });
        }
        res.status(StatusCodes.OK).json(updatedCountry);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// Xóa quốc gia dựa trên slug
export const removeCountry = async (req, res) => {
    try {
        const countrySlug = req.params.slug; // Sử dụng slug
        // Kiểm tra quốc gia có tồn tại không
        const countryToDelete = await Country.findOne({ slug: countrySlug });
        if (!countryToDelete) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy quốc gia nào để xóa." });
        }
        // Không cho phép xóa quốc gia mặc định
        if (countryToDelete.isDefault) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Không thể xóa quốc gia mặc định." });
        }
        // Kiểm tra xem có phim nào liên kết với quốc gia này không
        const relatedMovies = await Movies.find({ country: countryToDelete._id });
        // Nếu có phim liên kết, cần tạo quốc gia "Không xác định" (nếu chưa tồn tại)
        let defaultCountry = await Country.findOne({ name: 'Không xác định' });
        if (relatedMovies.length > 0 && !defaultCountry) {
            // Tạo quốc gia "Không xác định" nếu chưa tồn tại
            defaultCountry = new Country({
                name: 'Không xác định',
                isDefault: true
            });
            await defaultCountry.save();
        }
        // Nếu có phim liên kết, cập nhật tất cả các phim sang quốc gia "Không xác định"
        if (relatedMovies.length > 0) {
            await Movies.updateMany({ country: countryToDelete._id }, { country: defaultCountry._id });
        }
        // Xóa quốc gia
        await Country.findByIdAndDelete(countryToDelete._id);
        res.status(StatusCodes.OK).json({
            message: relatedMovies.length > 0
                ? `Quốc gia đã bị xóa và ${relatedMovies.length} phim đã được cập nhật sang quốc gia "Không xác định".`
                : "Quốc gia đã bị xóa thành công."
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// Xóa nhiều quốc gia
export const deleteManyCountrys = async (req, res) => {
    try {
        const { slugs } = req.body; // Lấy danh sách slug từ req.body
        // Kiểm tra xem danh sách slugs có tồn tại và không trống
        if (!slugs || slugs.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có slug nào được cung cấp." });
        }
        // Quốc gia mặc định
        const defaultCountryId = 'default_country_id';

        // Tìm tất cả các phim liên quan đến các quốc gia cần xóa
        const relatedMovies = await Movies.find({ country: { $in: slugs } });

        // Cập nhật các phim liên quan đến quốc gia bị xóa sang quốc gia mặc định
        if (relatedMovies.length > 0) {
            await Movies.updateMany({ country: { $in: slugs } }, { country: defaultCountryId });
        }
        // Xóa các quốc gia trong danh sách slugs
        const result = await Country.deleteMany({ slug: { $in: slugs } });
        // Kiểm tra số lượng quốc gia đã xóa
        if (result.deletedCount === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy quốc gia nào để xóa." });
        }

        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
