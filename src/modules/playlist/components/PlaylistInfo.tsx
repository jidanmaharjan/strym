import { Button } from "antd";
import { useState } from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PlaylistSingleType } from "../../library/components/PlaylistCards";
import { FiUsers } from "react-icons/fi";

type PlaylistDetailType = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    height: any;
    url: string;
    width: any;
  }>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: Array<{
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      is_local: boolean;
      primary_color: any;
      track: {
        preview_url: string;
        available_markets: Array<string>;
        explicit: boolean;
        type: string;
        episode: boolean;
        track: boolean;
        album: {
          available_markets: Array<string>;
          type: string;
          album_type: string;
          href: string;
          id: string;
          images: Array<{
            url: string;
            width: number;
            height: number;
          }>;
          name: string;
          release_date: string;
          release_date_precision: string;
          uri: string;
          artists: Array<{
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }>;
          external_urls: {
            spotify: string;
          };
          total_tracks: number;
        };
        artists: Array<{
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }>;
        disc_number: number;
        track_number: number;
        duration_ms: number;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        popularity: number;
        uri: string;
        is_local: boolean;
      };
      video_thumbnail: {
        url: any;
      };
    }>;
    limit: number;
    next: string;
    offset: number;
    previous: any;
    total: number;
  };
  type: string;
  uri: string;
};

type PlaylistInfoProps = {
  data: PlaylistDetailType;
  playTracks: () => void;
};

const PlaylistInfo = (props: PlaylistInfoProps) => {
  const { data, playTracks } = props;
  const [favouritePlaylists, setFavouritePlaylists] = useState<
    PlaylistSingleType[]
  >(JSON.parse(localStorage.getItem("favouritePlaylists") || "[]"));

  return (
    <div className="flex gap-4 items-end sticky top-16 z-50 bg-white p-4">
      <div className="relative min-w-60">
        <img
          src={data?.images?.[0]?.url}
          alt={data.name}
          className="w-60 h-60"
        />
      </div>
      <div className="grid gap-4">
        <h1 className="text-5xl font-bold whitespace-nowrap overflow-x-scroll hide-scrollbar">
          {data.name}
        </h1>
        <div className="flex gap-2 items-center">
          <FiUsers />
          <p>{data.followers.total}</p>
        </div>
        <div className="text-black text-lg font-semibold flex gap-4">
          {data.owner.display_name}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button
            size="large"
            icon={<FaHeadphonesSimple />}
            type="primary"
            className="rounded-full"
            onClick={() => {
              playTracks();
            }}
          >
            Listen Now
          </Button>
          <Button
            size="large"
            shape="circle"
            icon={
              favouritePlaylists.find(
                (x: PlaylistSingleType) => x.id === data.id
              ) ? (
                <IoHeart className="text-primary" />
              ) : (
                <IoHeartOutline />
              )
            }
            onClick={() => {
              let newFav = null;
              if (
                favouritePlaylists.find(
                  (x: PlaylistSingleType) => x.id === data.id
                )
              ) {
                newFav = favouritePlaylists.filter(
                  (x: PlaylistSingleType) => x.id !== data.id
                );
              } else {
                newFav = [...favouritePlaylists, data];
              }
              setFavouritePlaylists(newFav);
              localStorage.setItem(
                "favouritePlaylists",
                JSON.stringify(newFav)
              );
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default PlaylistInfo;
