import { TheatreService } from "../services/theatre.service";
import { ShowResponsePayload } from "./payloads/show-Response.payload";
//import { SeatResponsePayload } from "./payloads/seat-Response.payload";

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
    //return as payload array
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
    //return as payload array
    res.send(seatModels);
  };
}
const TheatreControllerInstance = new TheatreController();
// const viewTimeStamp = HeartbeatControllerInstance.getTimeStamp;
export default TheatreControllerInstance;
