import { TheatreService } from "../services/theatre.service";
//import { SeatResponsePayload } from "..data/payloads/seat-Response.payload";

import { Request, Response } from "express";

class TheatreController {
  getMovieShows = async (req: Request, res: Response) => {
    const theatreIdUrl: string = req.params.theatreId;
    const movieIdUrl: string = req.query.movieId as string;
    const theatreService = new TheatreService();
    const showModels = await theatreService.getShowsOfMovie(
      theatreIdUrl,
      movieIdUrl
    );
    res.send(showModels);
  };
  getAvailableSeatsOfShow = async (req: Request, res: Response) => {
    const theatreIdUrl: string = req.params.theatreId;
    const movieIdUrl: string = req.query.movieId as string;
    const showIdUrl: string = req.query.showId as string;
    const theatreService = new TheatreService();
    const seatModels = await theatreService.getAvailableSeatsOfShow(
      theatreIdUrl,
      movieIdUrl,
      showIdUrl
    );
    res.send(seatModels);
  };
}
const theatreController = new TheatreController();
export default theatreController;
