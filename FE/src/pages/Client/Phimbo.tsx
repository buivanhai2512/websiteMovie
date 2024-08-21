
import React from "react";
import Banner from "@/components/Banner";
import { PlayCircleOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
function PhimBo() {
  return (
    <>
      <Banner />
      <div className="phim_le" style={{ backgroundColor: "#16161a" }}>
        <div
          className="flex gap-10 justify-center pt-3"
          style={{ fontSize: "19px" }}
        >
          <p className="hover:text-red-600 text-white">
            <PlayCircleOutlined
              style={{ marginRight: "5px", color: "orange" }}
            />
            Phim Bộ All
          </p>
          <p className="hover:text-red-600 text-white">Hành Động</p>
          <p className="hover:text-red-600 text-white">Tình Cảm</p>
          <p className="hover:text-red-600 text-white">Hài Hước</p>
          <p className="hover:text-red-600 text-white">Cổ Trang</p>
          <p className="hover:text-red-600 text-white">Tâm lý</p>
          <p className="hover:text-red-600 text-white">Hình Sự</p>
          <p className="hover:text-red-600 text-white">Chiến Tranh</p>
        </div>
        <div className="content_phim_le">
          <p
            className="text-white font-bold  mt-4"
            style={{ marginLeft: "180px", fontSize: "25px" }}
          >
            Hot Phim Bộ
          </p>
          <div className="flex justify-center" >
            <div className="grid grid-cols-6 gap-5 mt-3">
              <div>
                <img
                  src="https://cinema.momocdn.net/img/52528406612837557-Untitled-1.jpg"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Ma Da
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Kinh dị
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  8.2
                </span>
              </div>
              <div>
                <img
                  src="https://cinema.momocdn.net/img/52613133200744253-c%C3%A1m.jpg"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Cám
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Kinh dị
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  7.8
                </span>
              </div>
              <div>
                <img
                  src="https://cinema.momocdn.net/img/59077395433771429-iFU4OsKWyZbetd20gwll2Y2j4M0.jpg"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Borderlands
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Khoa học viễn tưởng
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  9.3
                </span>
              </div>
              <div>
                <img
                  src="https://cinema.momocdn.net/img/37472853072716025-xqjsuwiihnPk5YTYgJQRTSfkQr6.jpg"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Joker
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Khoa học viễn tưởng
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  9.8
                </span>
              </div>
              <div>
                <img
                  src="https://cinema.momocdn.net/img/52865336813314570-cuulong.png"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Cửu Long Thành Trại
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Hành động, Tâm lý
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  8.2
                </span>
              </div>
              <div>
                <img
                  src="https://cinema.momocdn.net/img/13458164115023959-Mai.png"
                  className="w-44 h-64 object-cover"
                />
                <p
                  className="text-white mt-1 font-medium"
                  style={{ fontSize: "18px" }}
                >
                  Mai
                </p>
                <p className="text-gray-200" style={{ fontSize: "14px" }}>
                  Tình Cảm
                </p>
                <StarFilled style={{ color: "gold" }} />{" "}
                <span className="text-gray-200" style={{ fontSize: "14px" }}>
                  6.7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhimBo;
