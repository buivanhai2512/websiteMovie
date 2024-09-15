import React from "react";
import Banner from "@/components/Banner";
import { FireFilled } from "@ant-design/icons";
import { StarFilled } from "@ant-design/icons";
import Info from "@/components/InfoFilm";
import { useState } from "react";
import { PlayCircleFilled } from "@ant-design/icons";
import { VideoCameraFilled } from "@ant-design/icons";
import Top10 from "@/components/Top10Film";
function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full bg-[#16161a]">
      <Banner />
      <div className="home_page max-w-[1408px] m-auto">
        <div className="content_hot xs:text-center sm:text-center md:text-start lg:text-start">
          <p className="text-white font-bold pt-10 text-3xl mb-3 md:ml-[38px] lg:ml-[75px] ">
            <FireFilled style={{ color: "red", fontSize: "30px" }} /> Mới nhất &
            Hot nhất
          </p>
        </div>
        <div className="flex justify-center md:mx-[45px]">
          <div className="grid lg:grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src="https://cinema.momocdn.net/img/59079680634476340-srX0KC0LCbJBFb4OKVPqY9FrNag.jpg"
                className={`w-48 h-auto object-cover transition-opacity duration-1000 ease-in-out ${
                  isHovered ? "opacity-50" : "opacity-100"
                }`}
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
              <div className="absolute left-0 w-full top-[26px]">
                <div className="flex justify-center mb-8 ">
                  {isHovered && (
                    <PlayCircleFilled
                      style={{ color: "white", fontSize: "30px" }}
                    />
                  )}
                </div>
                {isHovered && <Info />}
              </div>
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
          </div>
        </div>
        {/* Phim lẻ */}
        <div className="phim_le sm:mx-10">
          <div className="content_hot xs:text-center lg:text-start md:text-start">
            <p className="text-white font-bold pt-10 text-3xl  mb-3  lg:ml-[40px]">
              <VideoCameraFilled style={{ color: "red", fontSize: "30px" }} />{" "}
              Phim Lẻ
            </p>
          </div>
          <section className="xs:block sm:flex sm:justify-center lg:flex lg:justify-center md:flex md:justify-center">
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
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
            <aside className="xs:flex xs:justify-start xs:ml-5 xs:mt-5 sm:mt-0 sm:ml-5">
              <section>
                <p className="text-white text-2xl font-bold mb-3">
                  Top 10 phim lẻ
                </p>
                <Top10 />
                <div className="mt-4">
                  <Top10 />
                </div>
                <div className="mt-4">
                  <Top10 />
                </div>
              </section>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
