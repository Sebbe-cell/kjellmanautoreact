interface IVideoPlayerProps {
    embedId: string
}

const VideoPlayer = (props: IVideoPlayerProps): JSX.Element => {
    const { embedId } = props

    return (
        <div style={{margin: '1rem'}}>
            <div className="video-responsive">
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
                <h1>VÅR ERFARENHET, DITT VAL!</h1>
            </div>
        </div>
    )
}

export default VideoPlayer
