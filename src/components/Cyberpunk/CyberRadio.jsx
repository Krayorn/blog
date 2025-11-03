import { useState, useEffect, useRef } from 'react';


const titles = [
  "88.1 - DARKRETRO by Count & Dukes of Azure",
  "80.5 - DAGGA by Konrad OldMoney & Kartel Sonoro",
  "84.1 - BRUZEZ by Konrad OldMoney feat Johnny Gr4ves & Knixit",
  "83.1 - BLOUSES BLUE by Konrad OldMoney feat Cidro Onetoo, Perry Porter & NC3",
  "98.1 - BIGGER MAN by Konrad OldMoney feat Taelor Yung & Droox",
  "81.0 - BAMO by Konrad OldMoney feat Tonoso and Kartel Sonoro",
  "86.1 - I REALLY WANT TO STAY AT YOUR HOUSE by Rosa Walton & Hallie Coggins",
  "82.0 - HOLE IN THE SUN (feat COS & Conway) by Raney Shockne & Point Break Candy",
  "85.5 - HISTORY by Gazelle Twin & Trash Generation",
  "88.6 - HELLO GOOD MORNING by Konrad OldMoney feat. S-God & Pazoozu",
  "85.4 - GO BLAZE by Konrad OldMoney feat Chanarah, Cidro OneToo? & DNA feat. G'Natt",
  "98.5 - FOLLOW THE WHITE CROW by Kid Moxie, Ivan Iusco & Nablus",
  "94.2 - FLYING HEADS by Kid Moxie, Ivan Iusco & Ashes Potts",
  "87.6 - DELICATE WEAPON by Grimes & Lizzy Wizzy",
  "91.1 - DAY OF DEAD by Konrad OldMoney feat Taelor Yung & HAPS",
  "98.9 - ON MY WAY TO HELL by Połoz & Tinnitus",
  "92.8 - NBOM by Konrad OldMoney feat Cidro Onetoo, Perry Porter & DAPxFLEM",
  "88.4 - MAJOR CRIMES by HEALTH & Window Weather",
  "94.0 - KILL THE MESSENGER by Rezodrone (Jason Charles Miller & Jamison Boaz)",
  "82.4 - PLUCK U by Konrad OldMoney feat Ded Stark & Triple-B feat Gun-Fu",
  "95.1 - PONPON SHIT by Namakopuri & Us Cracks",
  "93.7 - PROBLEM KIDS by Konrad OldMoney feat Taelor Yung & Young Kenny",
  "81.1 - RUN THE BLOCK by Konrad OldMoney feat Taelor Yung & Bez Tatami feat Gully Foyle",
  "92.0 - SUBVERT by Rhys Fulber & Spoon Eater",
  "86.3 - SURPRISE ME, I'M SURPRISED TODAY by Nina Kraviz & Bara Nova",
  "86.0 - WHO'S READY FOR TOMORROW by Rat Boy & IBDY",
  "80.9 - WORLDS by Sebastian Robertson and Daniel Davies & The Unresolved",
  "93.7 - ANTAGONISTIC by Chris Cardena and Sebastian Robertson & Pacific Avenue",
  "91.1 - BARRIO by Konrad OldMoney feat Frawst & Big Machete",
  "91.2 - Black Terminal (Upgrade) - Blue Stahli, Danny Cocke & Inversion",
  "93.8 - BLIND by Raney Shockne & American Medical Association",
  "92.1 - COME CLOSE by Sebastian Robertson and Daniel Davies & Keine",
  "90.4 - DRAINED by Rhys Fulber & Sao Mai",
  "83.7 - FROST by Konrad OldMoney feat Frawst & XerzeX",
  "98.5 - HEAVE HO by Konrad OldMoney feat Frawst & XerzeX",
  "97.1 - ISOMETRIC AIR by Bryan Aspey & Quantum Lovers",
  "94.1 - HOOD by Konrad OldMoney feat Awrath & ChickyChickas",
  "88.4 - HIGH SCHOOL BULLY by Konrad OldMoney feat Cideo Onetoo and Perry Porter",
  "98.7 - MANIAK by Picasso & Doctor Berserk",
  "87.2 - MUERTO TRASH by Konrad OldMoney feat Blackheart NC & FKxU",
  "84.7 - MUÉVELO (Cumbia) by David Rolas & Papito Gringo",
  "99.6 - NEVER STOP ME by Steven Richard Davis & Den Of Degenerates",
  "97.5 - ONLY SON by Konrad OldMoney feat 37 Heartbreak & ChickyChickas",
  "96.5 - PRACTICAL HEART by Bryan Aspey & Quantum Lovers",
  "93.9 - REAL WINDOW by Bryan Aspey & Quantum Lovers",
  "97.7 - SERPANT by Konrad OldMoney feat Cerbeus and Johnney Gr4ves & 7 Facas",
  "96.8 - SIMPLE PLEASURES by Kid Moxie & Jänsens",
  "86.6 - NIGHT CITY by R E L & Artemis Delta",
  "87.4 - SUFFER ME by The Cold Stares & Brutus Backlash",
  "93.0 - TATTED ON MY FACE by Konrad OldMoney feat 37 Heartbreak & Don Mara",
  "86.9 - THE GOD MACHINES by Sebastian Robertson, Killl The Computer, Indijinouz",
  "97.8 - TRAUMA by Aligns & Rubicones",
  "81.8 - WARNING SHOTS by Konrad OldMoney feat Perry Porter w Cidro Onetoo & Laputan Machine",
  "92.5 - WESTCOAST TIL I DIE by Konrad OldMoney & DJ CholoZ",
  "81.0 - WITH HER by Steven Richard Davis & Ego Affliction",
  "89.4 - WORLDS (Vocal Stem) by Sebastian Robertson and Daniel Davies & The Un...",
  "80.5 - NIGHT CITY ALIENS by The Armed & Homeshool Dropouts",
  "81.6 - METAMORPHOSIS by Yugen Blakrok & Gorgon Madonna",
  "86.0 - MAKES ME FEEL BETTER by OnenO & Perilous Futur",
  "97.3 - KILL KILL by Le Destroy & The Bait",
  "90.4 - I WON'T LET YOU GO by Converge & Shattered Void",
  "86.4 - FRIDAY NIGHT FIRE FIGHT by Aligns & Rubicones",
  "80.9 - DINERO (feat. CERBEUS) by Konrad OldMoney & 7 Facas",
  "88.2 - DEAD PILOT by Sebastian Robertson and Daniel Davies & Keine (Official)",
  "92.3 - ADAPTIVE MANIPULATOR by Tomb Mold & Bacillus",
  "91.4 - DIRTY ROSES by Oneno & Perilous Futur",
  "84.1 - NO SAVE POINT - Run The Jewels & Yankee And The Brave",
  "80.2 - PAIN by Le Destroy & The Red Glare",
  "84.4 - REAKTION by Rezodrone (Jason Charles Miller & Jamison Boaz)",
  "80.7 - RESIST AND DISORDER by Rezodrone (Jason Charles Miller & Jamison Boaz)",
  "92.1 - RUN by Steven Richard Davis & Kings of Collapse",
  "93.0 - SELVA PULSÁTIL by Deafkids & Tainted Overlord",
  "97.0 - SUICIDE by Geno Lenardo feat. Valin \"ZEALE\" Zamerron & Code 137",
  "93.3 - VIOLENCE by Le Destroy & The Bait",
  "85.8 - WHEN IT'S WAR by Deadly Hunta, Maro Music & Footage Missing",
  "96.8 - GR4VES by Konrad OldMoney feat- Johnny Gr4ves & Kyubik",
  "96.1 - CLIP BOSS by Konrad OldMoney feat Johnny Gr4ves & Sugarcoob feat ANAK KONDA",
  "92.9 - USER FRIENDLY by Namakopuri & Us Cracks",
  "98.2 - MY LULLABY FOR YOU by Nina Kraviz & Bara Nova",
  "87.3 - HARM SWEATY PIT by Nina Kraviz & Bara Nova",
  "86.8 - DELIRIUM 2 by Nina Kraviz & Bara Nova",
  "80.9 - CHIPPIN' IN by Damian Ukeje, P.T. Adamczyk & Kerry Eurodyne",
  "90.8 - USER FRIENDLY by Namakopuri & Us Cracks",
  "90.9 - RATATATA by Baron Black, Auer & Baron Celine",
  "91.5 - LIKEWISE by RAT BOY & IBDY"
]

const CyberRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(6);
  const [volume, setVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volumeButtonPosition, setVolumeButtonPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const titleRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const volumeButtonRef = useRef(null);
  const volumeSliderContainerRef = useRef(null);

  const currentTitle = titles[currentIndex];

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    // from https://www.youtube.com/watch?v=gzbLODUb1sA&list=PLRFAOvDITgP8WEBHjuI-j9NTiDzIJlucz
    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      height: '1',
      width: '1',
      videoId: 'gzbLODUb1sA',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        list: 'PLRFAOvDITgP8WEBHjuI-j9NTiDzIJlucz',
        listType: 'playlist',
        shuffle: 1
      },
              events: {
                onReady: (event) => {
                  setIsPlayerReady(true);
                  event.target.setVolume(volume);
                  event.target.mute();
                },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        }
      }
    });
  };

  const togglePlayPause = () => {
    if (!playerInstanceRef.current) return;

    if (isPlaying) {
      playerInstanceRef.current.pauseVideo();
    } else {
      playerInstanceRef.current.playVideo();
      playerInstanceRef.current.unMute();
    }
  };


  const handleVolumeSliderClick = (e) => {
    if (!volumeSliderContainerRef.current) return;
    
    const rect = volumeSliderContainerRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const sliderHeight = rect.height;
    const newVolume = Math.max(0, Math.min(100, 100 - (clickY / sliderHeight) * 100));
    
    setVolume(newVolume);
    if (playerInstanceRef.current) {
      playerInstanceRef.current.setVolume(newVolume);
    }
  };

  const handleVolumeSliderMouseDown = (e) => {
    setIsDragging(true);
    handleVolumeSliderClick(e);
  };

  const handleVolumeSliderMouseMove = (e) => {
    if (!isDragging) return;
    handleVolumeSliderClick(e);
  };

  const handleVolumeSliderMouseUp = () => {
    setIsDragging(false);
  };

  const playSongAtIndex = (index) => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.playVideoAt(index);
      setCurrentIndex(index);
      if (!isPlaying) {
        playerInstanceRef.current.playVideo();
        playerInstanceRef.current.unMute();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isVolumeButton = volumeSliderRef.current && volumeSliderRef.current.contains(event.target);
      const isVolumeSlider = event.target.closest('.volume-slider-container');
      const isPlaylist = event.target.closest('.playlist-container');
      
      if (!isVolumeButton && !isVolumeSlider) {
        setShowVolumeSlider(false);
      }
      
      if (!isPlaylist) {
        setShowPlaylist(false);
      }
    };

    const handleMouseMove = (e) => handleVolumeSliderMouseMove(e);
    const handleMouseUp = () => handleVolumeSliderMouseUp();

    if (showVolumeSlider || showPlaylist) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [showVolumeSlider, isDragging, showPlaylist]);


  useEffect(() => {
    if (!isPlayerReady || !playerInstanceRef.current) return;

    const interval = setInterval(() => {
      if (playerInstanceRef.current && isPlaying) {
        const current = playerInstanceRef.current.getCurrentTime();
        const total = playerInstanceRef.current.getDuration();
        setCurrentTime(current);
        setDuration(total);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPlayerReady]);


  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-8 left-8 z-50 max-w-[80%]">
      <div className="cyber-radio-container relative">
        <div ref={playerRef} className="hidden"></div>
        
        <div className="outer-radio-border bg-neonb p-0.5 overflow-visible">
          <div className="inner-radio-border bg-dark p-2 overflow-visible">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => playSongAtIndex(currentIndex === 0 ? titles.length - 1 : currentIndex - 1)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                <button
                  onClick={togglePlayPause}
                  disabled={!isPlayerReady}
                  className="cyber-play-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-2 transition-all duration-200 disabled:opacity-50"
                >
                  {isPlaying ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => playSongAtIndex((currentIndex + 1) % titles.length)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                <button
                  onClick={() => playSongAtIndex(Math.floor(Math.random() * titles.length))}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5"/></svg>
                </button>

                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                
                <div className="relative overflow-visible" ref={volumeSliderRef}>
                  <button
                    ref={volumeButtonRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (volumeButtonRef.current) {
                        const rect = volumeButtonRef.current.getBoundingClientRect();
                        setVolumeButtonPosition({
                          x: rect.left + rect.width / 2,
                          y: rect.top
                        });
                      }
                      setShowVolumeSlider(!showVolumeSlider);
                    }}
                    className="volume-icon-button p-1 hover:bg-neonb/20 transition-all duration-200"
                  >
                    <svg className="w-3 h-3 text-neonb" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.816a1 1 0 011-.108zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                </div>
              </div>
              
              <div className="flex flex-col space-y-1 min-w-0 flex-1">
                <div 
                  ref={titleRef}
                  className="text-xs font-bold uppercase tracking-wider glow-text overflow-hidden whitespace-nowrap"
                  style={{ maxWidth: '200px', color: 'theme(\'colors.neonb\')' }}
                >
                  <div className="title-scroll">
                    {currentTitle}
                  </div>
                </div>
                
                <div className="w-full bg-neonr h-0.5 relative">
                  <div 
                    className="h-full bg-neonb transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showVolumeSlider && (
        <div 
          className="volume-slider-container fixed z-50"
          style={{
            left: `${volumeButtonPosition.x}px`,
            top: `${volumeButtonPosition.y - 80}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-dark border border-neonb p-2 rounded">
            <div 
              ref={volumeSliderContainerRef}
              className="custom-volume-slider w-1 h-16 bg-neonr relative cursor-pointer"
              onMouseDown={handleVolumeSliderMouseDown}
            >
              <div 
                className="absolute bottom-0 w-full bg-neonb transition-all duration-100"
                style={{ height: `${volume}%` }}
              ></div>
              <div 
                className="absolute w-2 h-2 bg-neonb rounded-full border border-dark transform -translate-x-0.5 transition-all duration-100"
                style={{ bottom: `${volume}%`, transform: 'translateX(-2px)' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {showPlaylist && (
        <div className="playlist-container fixed z-50 bottom-24 left-8">
          <div className="bg-dark border border-neonb p-3 rounded max-h-64 w-64 overflow-y-auto">
            <div className="text-xs font-bold text-neonb mb-2 uppercase tracking-wider">Playlist</div>
            <div className="space-y-1">
              {titles.map((title, index) => {
                const isCurrent = currentTitle === title;
                return (
                  <div className={`song-button-border hover:bg-neonb ${isCurrent ? 'bg-neonb' : ''}`} key={index}>
                    <button
                      onClick={() => playSongAtIndex(index)}
                      className={`song-button bg-dark m-[1px] w-full text-left p-2 text-xs bg-dark text-neonb ${
                        isCurrent ? 'font-bold' : ''
                      }`}
                    >
                      {isCurrent ? '▶ ' : ''}{title}
                    </button>
                  </div>
              );
              })}
            </div>
          </div>
        </div>
      )}
      
      <style jsx="true">{`
        .cyber-radio-container {
          filter: drop-shadow(0 0 10px theme('colors.neonb'));
        }
        
        .outer-radio-border {
          clip-path: polygon(
            0% 0%,
            100% 0%,
            calc(100% - 4px) 4px,
            calc(100% - 4px) calc(100% - 4px),
            calc(100% - 8px) 100%,
            4px 100%,
            0% calc(100% - 4px)
          );
        }
        
        .inner-radio-border {
          clip-path: polygon(
            0% 0%,
            100% 0%,
            calc(100% - 3px) 3px,
            calc(100% - 3px) calc(100% - 3px),
            calc(100% - 6px) 100%,
            3px 100%,
            0% calc(100% - 3px)
          );
        }
        
        .cyber-play-button, .cyber-nav-button {
          clip-path: polygon(
            0% 0%,
            calc(100% - 3px) 0%,
            100% 3px,
            100% calc(100% - 3px),
            calc(100% - 3px) 100%,
            3px 100%,
            0% calc(100% - 3px),
            0% 3px
          );
        }
    
        .song-button-border {
    clip-path: polygon(
            0% 0%,
            100% 0%,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0% 100%
          );
        }

        .song-button {
    clip-path: polygon(
            0% 0%,
            calc(100% - 2px) 0%,
            calc(100% - 2px) calc(100% - 10px),
            calc(100% - 11px) 100%,
            0% 100%
          );
        }

        .glow-text {
          text-shadow: 0 0 5px theme('colors.neonb'), 0 0 10px theme('colors.neonb'), 0 0 15px theme('colors.neonb');
        }
        
        .custom-volume-slider {
          user-select: none;
        }
        
        .title-scroll {
          animation: scrollText 8s linear infinite;
        }
        
        @keyframes scrollText {
          0% { transform: translateX(0); }
          50% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .playlist-container {
          filter: drop-shadow(0 0 5px theme('colors.neonb'));
        }
        
        .playlist-container::-webkit-scrollbar {
          width: 4px;
        }
        
        .playlist-container::-webkit-scrollbar-track {
          background: theme('colors.dark');
        }
        
        .playlist-container::-webkit-scrollbar-thumb {
          background: theme('colors.neonb');
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default CyberRadio;
