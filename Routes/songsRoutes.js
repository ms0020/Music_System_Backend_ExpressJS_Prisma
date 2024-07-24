import { Router } from "express";
import { addSong, fetchAllSongs, fetchBySong, deleteSong, updateSong } from '../Controller/SongsController.js';

const router = Router();

router.post("/", addSong);
router.post("/all_songs", fetchAllSongs);
router.post("/fetch_song_by_name", fetchBySong);
router.put("/:id/update_song", updateSong);
router.delete("/:id/delete_song", deleteSong);




export default router;