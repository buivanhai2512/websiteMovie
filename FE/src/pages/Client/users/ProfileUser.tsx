import { Button, Input, Modal, notification, Spin, Upload, UploadFile } from "antd";
import { UserOutlined, MailOutlined, UploadOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { updateUser } from "@/services/Auth/Auth";
import UseAuth from "@/hook/Auth/UseAuth";
import {  useParams } from "react-router-dom";
import axiosInstance from "@/config/Axios";
import { useQueryClient } from "react-query";
export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: {
      percent: number;
  };
}
const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const { userId } = useParams();
  const [backdropFileList, setBackdropFileList] = useState<UploadFile[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const { data, isLoading, error } = UseAuth(userId);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data?.user) {
      setUser({
        name: data.user.name || "",
        email: data.user.email || "",
        avatar: data.user.avatar || "",
      });
    }
  }, [data]);
  if (!userId) {
    return <div>Không tìm thấy ID người dùng</div>;
  }
  if (error) {
    return <div className="text-[red] h-16 flex justify-center items-center">Lỗi khi lấy dữ liệu</div>;
  }
  if (isLoading) {
    return <Spin />;
  }

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    try {
      setLoading(true);
      const response = await updateUser(userId, { name: user.name });
      setUser((prev) => ({ ...prev, name: response.user.name }));
      queryClient.invalidateQueries(["AUTH_KEY", userId]);
      setIsEditingName(false);
    } catch (error) {
      notification.error({ message: "Cập nhật tên thất bại!" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPassW = async () => {
    if (newPassword === confirmPassword) {
      try {
        setLoading(true);
        // Gọi API thay đổi mật khẩu
        await axiosInstance.put(`/api/v1/auth/${userId}/change-password`, {
          oldPassword,
          newPassword,
        });
        notification.success({ message: "Mật khẩu đã được thay đổi thành công!" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.log(error);
        notification.error({ message: "Cập nhật mật khẩu thất bại!" });
      } finally {
        setLoading(false);
      }
    } else {
      notification.error({ message: "Mật khẩu mới và xác nhận mật khẩu không khớp!" });
    }
  };
  const uploadFile = async (file: File) => {
    const CLOUD_NAME = "dzafnopsc";
    const PRESET_NAME = "nthShop";
    const FOLDER_NAME = "NTHSHOP";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    const response = await axios.post(api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  };

  // Hàm xử lý thay đổi file ảnh nền
  const handleBackdropChange = async (info: UploadChangeParam) => {
    const files = info.fileList.slice(-1); // Chỉ giữ lại 1 ảnh
    if (files.length > 0) {
      const file = files[0].originFileObj as File; // Lấy file đầu tiên
      const url = await uploadFile(file); // Upload file lên Cloudinary
      if (url) {
        setBackdropFileList([{ ...files[0], url }]); // Cập nhật fileList với URL mới
        setImgURL(url); // Cập nhật URL ảnh mới
        await updateUser(userId, { avatar: url }); // Cập nhật avatar với URL mới
      queryClient.invalidateQueries(["AUTH_KEY", userId]);
      }
    } else {
      setBackdropFileList([]); // Xóa nếu không có ảnh
    }
  };
  
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/auth/${userId}`);
      notification.success({ message: "Tài khoản đã được xóa thành công!" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Xóa tài khoản thất bại!" });
    }
  };

  return (
    <div>
    <div className="pt-[10rem]"></div>
    <div className="p-8 max-w-4xl mx-auto mb-[8rem] bg-white rounded-lg shadow">
      <div className="mt-10"></div>
      <h4 className="text-2xl font-semibold">Thông Tin Cá Nhân</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <UserOutlined className="text-xl mr-3" />
            <span className="font-medium">Tên</span>
            <div className="ml-auto flex items-center">
              {isEditingName ? (
                <>
                  <Input
                    value={user?.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-48"
                  />
                  <Button
                    icon={<CheckOutlined />}
                    onClick={handleSaveName}
                    className="ml-2 text-green-500 hover:text-green-700"
                  />
                </>
              ) : (
                <>
                  <span>{user?.name}</span>
                  <Button
                    icon={<EditOutlined />}
                    onClick={handleEditName}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <MailOutlined className="text-xl mr-3" />
            <span className="font-medium">Email</span>
            <p className="ml-auto">{user?.email}</p>
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-2">Thay đổi mật khẩu</label>
            <Input.Password
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mb-4"
            />
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4"
            />
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleSendPassW} className="text-blue-500 hover:text-blue-700">
              Thay đổi mật khẩu
            </Button>
          </div>

          <div>
            <Button danger onClick={handleDelete} style={{color: "white"}} className="w-full mt-4 bg-red-500 delete text-white">
              Xóa tài khoản
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold">Ảnh đại diện</h4>
          <div className="flex justify-center">
            {loading ? (
              <Spin />
            ) : (
              <img src={imgURL || user?.avatar} className="w-32 h-32 object-cover rounded-full" alt="Avatar" />
            )}
          </div>

          <div className="flex justify-center">
            <Upload
             fileList={backdropFileList}
             onChange={handleBackdropChange}
              className="chooseFile"
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} className="text-blue-500 hover:text-blue-700">
                Cập nhật ảnh mới
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      <Modal
        title="Nhập mật khẩu cũ của bạn để xác nhận"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.Password placeholder="Nhập mật khẩu..." onChange={(e) => setPassword(e.target.value)} />
      </Modal>
    </div>
    </div>
  );
};

export default Profile;
