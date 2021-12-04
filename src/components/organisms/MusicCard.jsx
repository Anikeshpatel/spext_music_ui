import React from "react";
import { MdFavorite, MdPlaylistAdd, MdShare } from "react-icons/md";
import Card from "../atoms/Card";
import ImageView from "../molecules/ImageView";
import Button from "../molecules/Button";
import Typography from "../atoms/Typography";

export default function MusicCard(props) {
  const { music } = props;
  return (
    <Card round="lg" className="music_card">
      <div className="row p2">
        <ImageView source={music.albumArt} width="25rem" height="25rem" />

        <div className="column justify_between p2 flex-1">
          <Typography size="md">Now Playing</Typography>

          <div>
            <Typography size="lg" bold>
              {music.title}
            </Typography>

            <Typography size="md">{music.artist}</Typography>

            <Typography size="sm">{music.album}</Typography>
          </div>

          <div className="row justify_between music_action_container">
            <Button rounded outlined icon={<MdFavorite size="25" />} />
            <Button
              rounded
              outlined
              icon={<MdPlaylistAdd size="25" />}
            />
            <Button rounded outlined icon={<MdShare size="25" />} />
          </div>
        </div>
      </div>
    </Card>
  );
}
