import { CreditsType } from "./credits";
import { MovieByIdType } from "./movie";
import { ReviewType } from "./reviews";
import { VideoType } from "./video";

interface MovieSectionType {
  datas: MovieByIdType | null;
  recommendations: [MovieByIdType] | [];
  reviews: [ReviewType] | ReviewType[] | [];
  videos: [VideoType] | [];
  credits: CreditsType | null;
}

export type { MovieSectionType };
