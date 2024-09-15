import React from "react";
import Banner from "@/components/Banner";
import { PlayCircleOutlined } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import { VideoCameraFilled } from "@ant-design/icons";
function PhimLe() {
  return (
    <div className="w-full bg-[#16161a]">
      <Banner />
      <div className="phim_le max-w-[1408px] m-auto">
        <div
          className="flex gap-10 justify-center pt-3 xs:hidden lg:flex sm:hidden"
          style={{ fontSize: "19px" }}
        >
          <p className="hover:text-red-600 text-white md:ml-[30px]">
            <PlayCircleOutlined
              style={{ marginRight: "5px", color: "orange" }}
            />
            Phim Lẻ All
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
          <div className="phim_le sm:mx-10">
          <p
            className="text-white font-bold  mt-4 xs:text-center xs:mb-5 lg:text-start lg:ml-[40px] md:text-start md:ml-[35px]"
            style={{ fontSize: "30px" }}
          >
            Hot Phim Lẻ
          </p>
          <div className="content_hot xs:text-center lg:text-start md:text-start">
          </div>
          <section className="xs:block sm:flex sm:justify-center lg:flex lg:justify-center md:flex md:justify-center">
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
                <div>
                  <img
                    src="https://cinema.momocdn.net/img/59079680634476340-srX0KC0LCbJBFb4OKVPqY9FrNag.jpg"
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
                    style={{ fontSize: "18px" }}
                  >
                    Mufasa: Vua Sư Tử
                  </p>
                  <p className="text-gray-200" style={{ fontSize: "14px" }}>
                    Phiêu Lưu
                  </p>
                  <StarFilled style={{ color: "gold" }} />{" "}
                  <span className="text-gray-200" style={{ fontSize: "14px" }}>
                    9.6
                  </span>
                </div>
                <div>
                  <img
                    src="https://cinema.momocdn.net/img/59077395433771429-iFU4OsKWyZbetd20gwll2Y2j4M0.jpg"
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
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
                    src="https://cinema.momocdn.net/img/59077395433771429-iFU4OsKWyZbetd20gwll2Y2j4M0.jpg"
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
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
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
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
                    src="https://cinema.momocdn.net/img/59079680634476340-srX0KC0LCbJBFb4OKVPqY9FrNag.jpg"
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
                    style={{ fontSize: "18px" }}
                  >
                    Mufasa: Vua Sư Tử
                  </p>
                  <p className="text-gray-200" style={{ fontSize: "14px" }}>
                    Phiêu Lưu
                  </p>
                  <StarFilled style={{ color: "gold" }} />{" "}
                  <span className="text-gray-200" style={{ fontSize: "14px" }}>
                    9.6
                  </span>
                </div>
                <div>
                  <img
                    src="https://cinema.momocdn.net/img/59079680634476340-srX0KC0LCbJBFb4OKVPqY9FrNag.jpg"
                    className="w-48 h-auto object-cover"
                  />
                  <p
                    className="text-white mt-2 font-medium"
                    style={{ fontSize: "18px" }}
                  >
                    Mufasa: Vua Sư Tử
                  </p>
                  <p className="text-gray-200" style={{ fontSize: "14px" }}>
                    Phiêu Lưu
                  </p>
                  <StarFilled style={{ color: "gold" }} />{" "}
                  <span className="text-gray-200" style={{ fontSize: "14px" }}>
                    9.6
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}

export default PhimLe;
