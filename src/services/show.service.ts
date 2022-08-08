import { showRepository } from "../repositories/show.repository";

class ShowService {
  isShowValid = async (showId: string): Promise<boolean> => {
    return (await showRepository.getShow(showId)) ? true : false;
  };
}

export const showService = new ShowService();
