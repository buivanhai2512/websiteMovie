import { registerSchema } from "../Schemas/auth";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const singup = async (req, res) => {
    //    lấy dữ liệu từ user gửi lên
    const { email, password, name, confirmPassword, age, avatar } = req.body;
    // kiểm tra xem dữ liệu có hợp lệ không
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map((message) => message.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }
    // kiểm tra xem username đã tồn tại chưa
    const exitEmail = await User.findOne({ email });
    const exitUser = await User.findOne({ name });
    if (exitUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Tên tài khoản đã tồn tại"],
        });
    }
    if (exitEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }

    // mã hóa password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    // lưu vào database
    const useName = req.body.name;
    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });
    User.password = undefined;
    return res.status(StatusCodes.CREATED).json({
        user,
    });
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Email không tồn tại"],
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Mật khẩu không chính xác"],
        });
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "7d",
    });
    return res.status(StatusCodes.OK).json({
        user,
        token,
    });
};

export const changePassword = async (req, res) => {
    const { userId } = req.params; // ID người dùng từ URL
    const { oldPassword, newPassword } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                messages: ["Người dùng không tồn tại"],
            });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messages: ["Mật khẩu cũ không chính xác"],
            });
        }

        // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
        user.password = await bcryptjs.hash(newPassword, 10);
        await user.save();

        return res.status(StatusCodes.OK).json({
            message: "Đổi mật khẩu thành công",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages: ["Đã xảy ra lỗi khi đổi mật khẩu"],
        });
    }
};

export const checkrole = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { userId } = jwt.verify(token, "123456");
        const acc = await User.findById(userId);
        if (acc.role != "admin") {
            return res.status(401).json({ message: "Bạn không có quyền " });
        }
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Token hết hạn. Vui lòng đăng nhập lại" });
        }
        // Xử lý các lỗi khác
        console.error(error);
        return res.status(401).json({ message: "Token không hợp lệ" });
    }
};
export const logout = async (req, res) => { };
// Lấy thông tin người dùng theo ID
export const getUserById = async (req, res) => {
    const { userId } = req.params; // Lấy ID người dùng từ URL

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                messages: ["Người dùng không tồn tại"],
            });
        }
        return res.status(StatusCodes.OK).json({
            user: {
                name: user.name,
                email: user.email,
                age: user.age,
                avatar: user.avatar,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages: ["Đã xảy ra lỗi khi lấy thông tin người dùng"],
        });
    }
};
// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
        if (!users || users.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                messages: ["Không có người dùng nào"],
            });
        }
        return res.status(StatusCodes.OK).json({
            users,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages: ["Đã xảy ra lỗi khi lấy danh sách người dùng"],
        });
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
    const { userId } = req.params; // Lấy id người dùng từ URL
    const { name, email, password, newPassword, oldPassword, age, avatar } =
        req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Người dùng không tồn tại"],
        });
    }

    // Kiểm tra mật khẩu cũ nếu có thay đổi mật khẩu
    if (newPassword && oldPassword) {
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messages: ["Mật khẩu cũ không chính xác"],
            });
        }

        // Mã hóa mật khẩu mới
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword; // Cập nhật mật khẩu
    }

    // Cập nhật các thông tin còn lại (email, tên, tuổi, avatar)
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;
    if (avatar) user.avatar = avatar;

    // Lưu thay đổi vào DB
    await user.save();

    // Trả về thông tin người dùng đã được cập nhật
    return res.status(StatusCodes.OK).json({
        message: "Cập nhật thông tin thành công",
        user: {
            name: user.name,
            email: user.email,
            age: user.age,
            avatar: user.avatar,
        },
    });
};
// xóa user
export const deleteUser = [
    async (req, res) => {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                messages: ["Người dùng không tồn tại"],
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(StatusCodes.OK).json({
            message: "Người dùng đã được xóa thành công",
        });
    },
];
