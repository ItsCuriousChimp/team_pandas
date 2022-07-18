import { TheatreService } from "../services/theatre.service";
//import { SeatResponsePayload } from "..data/payloads/seat-Response.payload";

import { Request, Response } from "express";

class TheatreController {
  getMovieShows = async (req: Request, res: Response) => {
    const theatreIdUrl: string = req.params.theatresId;
    const movieIdUrl: string = req.query.movieId as string;
    const TheatreServiceInstance = new TheatreService();
    const showModels = await TheatreServiceInstance.getShowsOfMovie(
      theatreIdUrl,
      movieIdUrl
    );
    res.send(showModels);
  };
  getAvailableSeatsOfShow = async (req: Request, res: Response) => {
    const theatreIdUrl: string = req.params.theatresId;
    const movieIdUrl: string = req.query.movieId as string;
    const showIdUrl: string = req.query.showId as string;
    const TheatreServiceInstance = new TheatreService();
    const seatModels = await TheatreServiceInstance.getAvailableSeatsOfShow(
      theatreIdUrl,
      movieIdUrl,
      showIdUrl
    );
    res.send(seatModels);
  };
}
const TheatreControllerInstance = new TheatreController();
export default TheatreControllerInstance;
