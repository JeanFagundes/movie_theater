interface YouTubeVideoProps {
  videoKey: string | undefined;
}

function YouTubeVideo({ videoKey }: YouTubeVideoProps) {
  const videoUrl = `https://www.youtube.com/embed/${videoKey}?controls=0&showinfo=0&modestbranding=1`;

  return (
    <div>
      <iframe
        width="100%"
        height="210"
        src={videoUrl}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}

export default YouTubeVideo;
