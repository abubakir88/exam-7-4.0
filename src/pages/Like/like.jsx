import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { All } from "../../components/links";
import { getPlaylists, getToken } from "../../components/fetchData";
import like from "/like.png";
import "./like.scss";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { CiSaveDown1 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const Details = () => {
  const { id } = useParams();
  const api = window.location.href;
  const apiUrl = api.toString().split("?type=")[1];
  const token = "https://accounts.spotify.com/api/token";

  const [data, setData] = useState([]);
  const [album, setAlbum] = useState([]);

  // const timeInMilliseconds = data.;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(token);
        const playlists = await getPlaylists(All);
        const album = await getPlaylists(
          "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks"
        );
        setData(playlists?.playlists.items);
        // console.log(data);
        setAlbum(album.items);
        console.log(album);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [api, apiUrl, data, id]);

  return (
    <div className="playlist-content">
      <>
        {/* {data?.map((el, i) => { */}
        {/* // if (el?.id === id) { */}
        {/* // return ( */}
        <div>
          <div className="playlist-top">
            <div className="arrows">
              <IoIosArrowBack className="IoIosArrowBack" />
              <IoIosArrowForward className="IoIosArrowForward" />
            </div>
            <div className="playlist_top-texts">
              <img src={like} alt="" />
              <div className="texts">
                <h6>PUBLIC PLAYLIST</h6>
                <h1>Liked Songs</h1>
                <p>
                  Julia Wolf, ayokay, Khalid <span>and more</span>
                </p>
                <p>
                  <span>ade for </span>davedirect3
                  <span>34 songs, 2hr 01 min</span>
                </p>
              </div>
            </div>
          </div>
          <div className="padding">
            <div className="actions">
              <div className="buttons">
                <FaCirclePlay className="FaCirclePlay" />
                <FcLike className="FcLike" />
                <CiSaveDown1 className="CiSaveDown1" />
                <BsThreeDots className="BsThreeDots" />
              </div>
              <div className="search">
                <IoSearchOutline className="IoSearchOutline" />
                <p>Custom order</p>
                <IoIosArrowDown className="IoIosArrowDown" />
                <p></p>
              </div>
            </div>
            <table className="table table-dark table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">TITLE</th>
                  <th scope="col">ALBUM</th>
                  <th scope="col">DATE ADDED</th>
                  <th scope="col">
                    <MdOutlineWatchLater />
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {album.slice(0, 20).map((items, i) => (
                    <tr className="playlist" key={i}>
                      {/* {console.log(items)} */}
                      <th>{i + 1}</th>
                      <td className="name">
                        <img src={items.track.album.images[2].url} alt="" />
                        <span>{items.track.artists[0].name}</span>
                      </td>
                      <td>{items.track.name}</td>
                      <td>
                        <audio controls src={items.track.preview_url}></audio>
                      </td>
                      <td>time</td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
};

export default Details;
