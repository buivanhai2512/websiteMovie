import { Breadcrumb, Button, Input, message, Spin, theme } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";

const AddEpisode = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [serverName, setServerName] = useState("");
  const [embed, setEmbed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient(); 

  const [error, setError] = useState<string | null>(null);
  const { movieSlug } = useParams(); // Lấy episodeId từ URL nếu cần
const navigate = useNavigate();
  // Hàm submit form để thêm tập phim
  const handleAddEpisode = async () => {
    if (!serverName || !embed) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
     await axios.post(
        `http://localhost:8080/api/episodes`, 
        {movieSlug: movieSlug, server_name: serverName, embed }
      );
      message.success("Thêm tập phim thành công !")
      queryClient.invalidateQueries(['episodes', movieSlug]);
      navigate(`/admin/list-tap-phim/${movieSlug}`);
      // Redirect hoặc hiển thị thông báo thành công nếu cần
    } catch (err) {
      setError("Lỗi khi thêm tập phim!");
      console.error("Lỗi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Content className="mx-10 my-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Add-Episode" }]}
          style={{ margin: "16px 0" }}
        />
        <Link to={`/admin/list-tap-phim`}>
          <Button type="primary" icon={<RollbackOutlined />}>
            Trở lại
          </Button>
        </Link>
      </div>

      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <div className="m-auto w-[70%]">
            {error && <div className="text-red-500">{error}</div>}
            {/* Tên tập phim */}
            <div className="mb-4">
              <Input
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Nhập tên tập phim"
                size="large"
                className="w-full"
              />
            </div>
            {/* Embed link */}
            <div className="mb-4">
              <Input
                value={embed}
                onChange={(e) => setEmbed(e.target.value)}
                placeholder="Nhập link tập phim"
                size="large"
                className="w-full"
              />
            </div>

            {/* Nút thêm */}
            <Button type="primary" onClick={handleAddEpisode} className="w-full" size="large">
              Thêm Tập Phim
            </Button>
          </div>
        )}
      </div>
    </Content>
  );
};

export default AddEpisode;
