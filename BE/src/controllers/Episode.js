import { StatusCodes } from "http-status-codes";
import Episode from "../models/Episodes";
import Movies from "../models/Movies";
import mongoose from "mongoose";
function generateSlugFromServerName(server_name) {
    return server_name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

// Thêm một tập phim vào Movie
export const addEpisode = async (req, res) => {
    try {
        const { movieSlug, server_name, embed } = req.body;

        // Kiểm tra các trường cần thiết
        if (!server_name || !embed || !movieSlug) {
            return res
                .status(400)
                .json({
                    message: "Thiếu thông tin cần thiết: server_name, embed, movieSlug",
                });
        }

        // Tìm movie từ movieSlug
        const movie = await Movies.findOne({ slug: movieSlug });
        if (!movie) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy phim với slug này" });
        }
        // Tạo tập phim mới
        const newEpisode = new Episode({
            movieId: movie, // Lưu slug của phim vào tập phim
            server_name,
            embed,
        });

        // Lưu vào cơ sở dữ liệu
        await newEpisode.save();

        // Trả về kết quả thành công
        res.status(201).json(newEpisode);
    } catch (error) {
        console.error("Error adding episode:", error);
        res.status(500).json({ message: "Lỗi khi thêm tập phim" });
    }
};

// Cập nhật thông tin tập phim
export const updateEpisode = async (req, res) => {
    try {
        const { slug, server_name, embed } = req.body;

        // Kiểm tra nếu có slug, server_name, hoặc embed
        if (!slug || !server_name || !embed) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Thiếu thông tin cần thiết để cập nhật tập phim." });
        }

        // Tìm tập phim theo slug và cập nhật thông tin
        const updatedEpisode = await Episode.findOneAndUpdate(
            { slug: slug }, // Tìm theo slug
            { server_name, embed },
            { new: true } // Trả về tài liệu đã được cập nhật
        );

        // Kiểm tra nếu không tìm thấy tập phim
        if (!updatedEpisode) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy tập phim để cập nhật!" });
        }

        // Trả về kết quả sau khi cập nhật
        res.status(StatusCodes.OK).json({ message: "Cập nhật tập phim thành công!", episode: updatedEpisode });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi khi cập nhật tập phim" });
    }
};

// Xóa một tập phim khỏi Movie
export const deleteEpisode = async (req, res) => {
    try {
        const { episodeId } = req.params; // Lấy episodeId từ body
        // Tìm và xóa episode khỏi collection Episode
        const deletedEpisode = await Episode.findByIdAndDelete(episodeId);

        if (!deletedEpisode) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy tập phim để xóa!" });
        }

        res.status(StatusCodes.OK).json({ message: "Tập phim đã được xóa thành công!" });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Lỗi khi xóa tập phim" });
    }
};

// Lấy tất cả các tập phim của một Movie

export const getEpisodes = async (req, res) => {
    try {
        const { movieSlug } = req.params;

        // Tìm movie dựa trên slug
        const movie = await Movies.findOne({ slug: movieSlug });
        if (!movie) {
            return res.status(404).json({ message: "Không tìm thấy phim!" });
        }
        console.log("movies", movie)
        // Sử dụng new để tạo ObjectId
        const movieId = new mongoose.Types.ObjectId(movie._id);
        // Lấy tất cả các tập phim liên qu an đến movieId
        const episodes = await Episode.find({ movieId: movie._id });

        if (episodes.length === 0) {
            return res.status(404).json({ message: "Không có tập phim nào!" });
        }
        return res.status(200).json({
            episode: episodes,
            movie: movie
        });
    } catch (error) {
        console.error("Error fetching episodes:", error.message);
        return res.status(500).json({ message: "Lỗi server khi lấy tập phim." });
    }
};
// export const getEpisodesById = async (req, res) => {
//     try {
//         const { episodeId } = req.params; // Lấy episodeId từ URL params

//         // Tìm tập phim dựa trên episodeId
//         const episode = await Episode.findById(episodeId);
//         if (!episode) {
//             return res.status(404).json({ message: "Không tìm thấy tập phim!" });
//         }
//         const movie = await Movies.findById(episode.movieId); // Lấy movieId từ tập phim
//         if (!movie) {
//             return res.status(404).json({ message: "Không tìm thấy phim tương ứng!" });
//         }
//         return res.status(200).json({
//             episode: episode,
//             movie: movie // Trả về thông tin tập phim
//         });
//     } catch (error) {
//         console.error("Error fetching episode:", error.message);
//         return res.status(500).json({ message: "Lỗi server khi lấy thông tin tập phim." });
//     }
// };
export const getEpisodesById = async (req, res) => {
    try {
        const { slug } = req.params;
        // Tìm tập phim dựa trên slug thay vì _id
        const episode = await Episode.findOne({ slug: slug });
        if (!episode) {
            return res.status(404).json({ message: "Không tìm thấy tập phim!" });
        }

        // Lấy movieId từ episode và tìm movie tương ứng
        const movie = await Movies.findById(episode.movieId);
        if (!movie) {
            return res.status(404).json({ message: "Không tìm thấy phim tương ứng!" });
        }

        return res.status(200).json({
            episode: episode,
            movie: movie
        });
    } catch (error) {
        console.error("Error fetching episode:", error.message);
        return res.status(500).json({ message: "Lỗi server khi lấy thông tin tập phim." });
    }
};





