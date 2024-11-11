export interface country {
    slug: string;  // Thay đổi từ _id thành slug
    name: string;
  }
export  interface Genres {
    _id: string;
    name: string;
    slug: string ; 
  }
  
  export interface Movie {
    _id?: string; // Một số backend tự động tạo ID, không cần thiết khi thêm mới phim
    name: string;
    slug?: string; // Slug thường được tạo tự động từ tên
    genres: string[];
    episodes?: { // Mảng các đối tượng episode
      server_name?: string;
      slug?: string;
      embed?: string;
    }[];
    country: string[] | string;
    backdrop_path: string | null;
    poster_path: string | null;
    imdbPoints?: number;
    overview: string;
    releaseDate: string;
    category: string;
    trailerCode: string;
  }
  