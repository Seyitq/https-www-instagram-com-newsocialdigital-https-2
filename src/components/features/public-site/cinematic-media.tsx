"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { STUDIO_POSTER } from "@/lib/studio-content";

export function CinematicMedia({ videoSrc, webmSrc }: { videoSrc?: string; webmSrc?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!videoSrc || !video.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 901px)");

    function applyMotionPreference() {
      if (mediaQuery.matches) {
        video.current?.pause();
      } else if (desktopQuery.matches) {
        void video.current?.play().catch(() => setFailed(true));
      }
    }

    applyMotionPreference();
    mediaQuery.addEventListener("change", applyMotionPreference);
    desktopQuery.addEventListener("change", applyMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", applyMotionPreference);
      desktopQuery.removeEventListener("change", applyMotionPreference);
    };
  }, [videoSrc]);

  async function togglePlayback() {
    if (!video.current) return;
    if (video.current.paused) {
      try {
        await video.current.play();
      } catch {
        setFailed(true);
      }
    } else {
      video.current.pause();
    }
  }

  return (
    <div className="cinema-media">
      <Image
        src={STUDIO_POSTER}
        alt="Set ışıkları önünde profesyonel sinema kamerası; temsilî prodüksiyon fotoğrafı"
        fill
        preload
        sizes="(max-width: 900px) 90vw, 45vw"
        className="cinema-media__poster"
      />
      {videoSrc && !failed && (
        <video
          ref={video}
          className="cinema-media__video"
          poster={STUDIO_POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="BK Media House sessiz tanıtım filmi"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      )}
      <div className="cinema-media__shade" />
      <div className="cinema-media__caption">
        <span className="cinema-media__dot" />
        <span>Fotoğraf. Video. Hikâye.</span>
        {videoSrc && !failed ? (
          <button type="button" onClick={togglePlayback} aria-label={playing ? "Tanıtım filmini duraklat" : "Tanıtım filmini oynat"}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Duraklat" : "Filmi oynat"}
          </button>
        ) : <span className="cinema-media__credit">Görsel referans / Pexels</span>}
      </div>
    </div>
  );
}
