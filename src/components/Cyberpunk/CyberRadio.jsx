import { useState, useEffect, useRef } from 'react';


const titles = [
    "CYBERPUNK 2077 SOUNDTRACK - DARKRETRO by Count & Dukes of Azure (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DAGGA by Konrad OldMoney & Kartel Sonoro (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - BRUZEZ by Konrad OldMoney feat Johnny Gr4ves & Knixit (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - BLOUSES BLUE by Konrad OldMoney feat Cidro Onetoo, Perry Porter & NC3",
    "CYBERPUNK 2077 SOUNDTRACK - BIGGER MAN by Konrad OldMoney feat Taelor Yung & Droox (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - BAMO by Konrad OldMoney feat Tonoso and Kartel Sonoro (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - I REALLY WANT TO STAY AT YOUR HOUSE by Rosa Walton & Hallie Coggins",
    "CYBERPUNK 2077 SOUNDTRACK - HOLE IN THE SUN (feat COS & Conway) by Raney Shockne & Point Break Candy",
    "CYBERPUNK 2077 SOUNDTRACK - HISTORY by Gazelle Twin & Trash Generation (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - HELLO GOOD MORNING by Konrad OldMoney feat. S-God & Pazoozu",
    "CYBERPUNK 2077 - GO BLAZE by Konrad OldMoney feat Chanarah, Cidro OneToo? & DNA feat. G'Natt",
    "CYBERPUNK 2077 - FOLLOW THE WHITE CROW by Kid Moxie, Ivan Iusco & Nablus",
    "CYBERPUNK 2077 SOUNDTRACK - FLYING HEADS by Kid Moxie, Ivan Iusco & Ashes Potts",
    "CYBERPUNK 2077 SOUNDTRACK - DELICATE WEAPON by Grimes & Lizzy Wizzy (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DAY OF DEAD by Konrad OldMoney feat Taelor Yung & HAPS (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - ON MY WAY TO HELL by Połoz & Tinnitus (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - NBOM by Konrad OldMoney feat Cidro Onetoo, Perry Porter & DAPxFLEM",
    "CYBERPUNK 2077 SOUNDTRACK - MAJOR CRIMES by HEALTH & Window Weather (Official Video)",
    "CYBERPUNK 2077 - KILL THE MESSENGER by Rezodrone (Jason Charles Miller & Jamison Boaz)",
    "CYBERPUNK 2077 SOUNDTRACK - PLUCK U by Konrad OldMoney feat Ded Stark & Triple-B feat Gun-Fu",
    "CYBERPUNK 2077 SOUNDTRACK - PONPON SHIT by Namakopuri & Us Cracks (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - PROBLEM KIDS by Konrad OldMoney feat Taelor Yung & Young Kenny",
    "CYBERPUNK 2077 - RUN THE BLOCK by Konrad OldMoney feat Taelor Yung & Bez Tatami feat Gully Foyle",
    "CYBERPUNK 2077 SOUNDTRACK - SUBVERT by Rhys Fulber & Spoon Eater (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - SURPRISE ME, I'M SURPRISED TODAY by Nina Kraviz & Bara Nova",
    "CYBERPUNK 2077 SOUNDTRACK - WHO'S READY FOR TOMORROW by Rat Boy & IBDY (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - WORLDS by Sebastian Robertson and Daniel Davies & The Unresolved",
    "CYBERPUNK 2077 SOUNDTRACK - ANTAGONISTIC by Chris Cardena and Sebastian Robertson & Pacific Avenue",
    "CYBERPUNK 2077 SOUNDTRACK - BARRIO by Konrad OldMoney feat Frawst & Big Machete (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - Black Terminal (Upgrade) - Blue Stahli, Danny Cocke & Inversion",
    "CYBERPUNK 2077 SOUNDTRACK - BLIND by Raney Shockne & American Medical Association (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - COME CLOSE by Sebastian Robertson and Daniel Davies & Keine",
    "CYBERPUNK 2077 SOUNDTRACK - DRAINED by Rhys Fulber & Sao Mai (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - FROST by Konrad OldMoney feat Frawst & XerzeX (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - HEAVE HO by Konrad OldMoney feat Frawst & XerzeX (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - ISOMETRIC AIR by Bryan Aspey & Quantum Lovers (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - HOOD by Konrad OldMoney feat Awrath & ChickyChickas (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - HIGH SCHOOL BULLY by Konrad OldMoney feat Cideo Onetoo and Perry Porter",
    "CYBERPUNK 2077 SOUNDTRACK - MANIAK by Picasso & Doctor Berserk (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - MUERTO TRASH by Konrad OldMoney feat Blackheart NC & FKxU",
    "CYBERPUNK 2077 SOUNDTRACK - MUÉVELO (Cumbia) by David Rolas & Papito Gringo (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - NEVER STOP ME by Steven Richard Davis & Den Of Degenerates",
    "CYBERPUNK 2077 SOUNDTRACK - ONLY SON by Konrad OldMoney feat 37 Heartbreak & ChickyChickas",
    "CYBERPUNK 2077 SOUNDTRACK - PRACTICAL HEART by Bryan Aspey & Quantum Lovers (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - REAL WINDOW by Bryan Aspey & Quantum Lovers (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - SERPANT by Konrad OldMoney feat Cerbeus and Johnney Gr4ves & 7 Facas",
    "CYBERPUNK 2077 SOUNDTRACK - SIMPLE PLEASURES by Kid Moxie & Jänsens (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - NIGHT CITY by R E L & Artemis Delta (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - SUFFER ME by The Cold Stares & Brutus Backlash (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - TATTED ON MY FACE by Konrad OldMoney feat 37 Heartbreak & Don Mara",
    "CYBERPUNK 2077 - THE GOD MACHINES by Sebastian Robertson, Killl The Computer, Indijinouz",
    "CYBERPUNK 2077 SOUNDTRACK - TRAUMA by Aligns & Rubicones (Official Video)",
    "CYBERPUNK 2077 - WARNING SHOTS by Konrad OldMoney feat Perry Porter w Cidro Onetoo & Laputan Machine",
    "CYBERPUNK 2077 SOUNDTRACK - WESTCOAST TIL I DIE by Konrad OldMoney & DJ CholoZ (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - WITH HER by Steven Richard Davis & Ego Affliction (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - WORLDS (Vocal Stem) by Sebastian Robertson and Daniel Davies & The Un...",
    "CYBERPUNK 2077 SOUNDTRACK - NIGHT CITY ALIENS by The Armed & Homeshool Dropouts (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - METAMORPHOSIS by Yugen Blakrok & Gorgon Madonna (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - MAKES ME FEEL BETTER by OnenO & Perilous Futur (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - KILL KILL by Le Destroy & The Bait (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - I WON'T LET YOU GO by Converge & Shattered Void (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - FRIDAY NIGHT FIRE FIGHT by Aligns & Rubicones (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DINERO (feat. CERBEUS) by Konrad OldMoney & 7 Facas (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DEAD PILOT by Sebastian Robertson and Daniel Davies & Keine (Official)",
    "CYBERPUNK 2077 SOUNDTRACK - ADAPTIVE MANIPULATOR by Tomb Mold & Bacillus (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DIRTY ROSES by Oneno & Perilous Futur (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - NO SAVE POINT - Run The Jewels & Yankee And The Brave (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - PAIN by Le Destroy & The Red Glare (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - REAKTION by Rezodrone (Jason Charles Miller & Jamison Boaz)",
    "CYBERPUNK 2077 - RESIST AND DISORDER by Rezodrone (Jason Charles Miller & Jamison Boaz)",
    "CYBERPUNK 2077 SOUNDTRACK - RUN by Steven Richard Davis & Kings of Collapse (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - SELVA PULSÁTIL by Deafkids & Tainted Overlord (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - SUICIDE by Geno Lenardo feat. Valin \"ZEALE\" Zamerron & Code 137",
    "CYBERPUNK 2077 SOUNDTRACK - VIOLENCE by Le Destroy & The Bait (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - WHEN IT'S WAR by Deadly Hunta, Maro Music & Footage Missing",
    "CYBERPUNK 2077 SOUNDTRACK - GR4VES by Konrad OldMoney feat- Johnny Gr4ves & Kyubik",
    "CYBERPUNK 2077 - CLIP BOSS by Konrad OldMoney feat Johnny Gr4ves & Sugarcoob feat ANAK KONDA",
    "CYBERPUNK 2077 SOUNDTRACK - USER FRIENDLY by Namakopuri & Us Cracks (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - MY LULLABY FOR YOU by Nina Kraviz & Bara Nova (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - HARM SWEATY PIT by Nina Kraviz & Bara Nova (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - DELIRIUM 2 by Nina Kraviz & Bara Nova (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - CHIPPIN' IN by Damian Ukeje, P.T. Adamczyk & Kerry Eurodyne",
    "CYBERPUNK 2077 SOUNDTRACK - USER FRIENDLY by Namakopuri & Us Cracks (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - RATATATA by Baron Black, Auer & Baron Celine (Official Video)",
    "CYBERPUNK 2077 SOUNDTRACK - LIKEWISE by RAT BOY & IBDY (Official Video)"
]

const CyberRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Cyberpunk Radio');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlistTitles, setPlaylistTitles] = useState([]);
  const [volumeButtonPosition, setVolumeButtonPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const titleRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const volumeButtonRef = useRef(null);
  const volumeSliderContainerRef = useRef(null);

  // YouTube Radio URL
  const YOUTUBE_URL = 'https://www.youtube.com/watch?v=gzbLODUb1sA&list=PLRFAOvDITgP8WEBHjuI-j9NTiDzIJlucz';
  
  // Extract video ID from URL
  const getVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  // Clean song title by removing the "CYBERPUNK 2077 SOUNDTRACK - " prefix and "(Official Video)" suffix
  const cleanSongTitle = (title) => {
    if (!title) return 'Cyberpunk Radio';
    
    let cleanedTitle = title;
    
    // Remove prefix
    const prefix = 'CYBERPUNK 2077 SOUNDTRACK - ';
    if (cleanedTitle.startsWith(prefix)) {
      cleanedTitle = cleanedTitle.substring(prefix.length);
    }
    
    const prefix2 = 'CYBERPUNK 2077 - ';
    if (cleanedTitle.startsWith(prefix2)) {
      cleanedTitle = cleanedTitle.substring(prefix2.length);
    }

    // Remove suffix
    const suffix = ' (Official Video)';
    if (cleanedTitle.endsWith(suffix)) {
      cleanedTitle = cleanedTitle.substring(0, cleanedTitle.length - suffix.length);
    }
    
    return cleanedTitle;
  };

  const loadPlaylistTitles = () => {
    // Use the hardcoded titles array
    const cleanedTitles = titles.map(title => cleanSongTitle(title));
    setPlaylistTitles(cleanedTitles);
  };

  const videoId = getVideoId(YOUTUBE_URL);

  // Load YouTube IFrame API
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

    // If API is already loaded
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
    if (!videoId) return;

    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      height: '1',
      width: '1',
      videoId: videoId,
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
                  const initialIndex = event.target.getPlaylistIndex();
                  setCurrentIndex(initialIndex);
                  setCurrentTitle(cleanSongTitle(event.target.getVideoData().title));
                  event.target.setVolume(volume);
                  // Start muted to avoid autoplay issues
                  event.target.mute();
                  // Load playlist titles immediately
                  loadPlaylistTitles();
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
      // Unmute when user starts playing
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
      // Start playing if not already playing
      if (!isPlaying) {
        playerInstanceRef.current.playVideo();
        playerInstanceRef.current.unMute();
      }
      setShowPlaylist(false);
      // Update title immediately using titles array
      setCurrentTitle(cleanSongTitle(titles[index]));
    }
  };

  // Handle clicks outside volume slider and mouse events for dragging
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the volume button and the volume slider
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

    if (showVolumeSlider) {
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
  }, [showVolumeSlider, isDragging]);


  // Update progress bar
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
  }, [isPlaying, isPlayerReady, currentTitle]);


  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="cyber-radio-container relative">
        {/* Hidden YouTube player */}
        <div ref={playerRef} className="hidden"></div>
        
        {/* Outer border with cyberpunk clip-path - reduced size */}
        <div className="outer-radio-border bg-neonb p-0.5 overflow-visible">
          <div className="inner-radio-border bg-dark p-2 overflow-visible">
            {/* Radio Display - horizontal layout */}
            <div className="flex items-center space-x-3">
              {/* Controls */}
              <div className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={() => playSongAtIndex(currentIndex === 0 ? titles.length - 1 : currentIndex - 1)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Play/Pause Button - neonb color */}
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

                {/* Next Button */}
                <button
                  onClick={() => playSongAtIndex((currentIndex + 1) % titles.length)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Random Button */}
                <button
                  onClick={() => playSongAtIndex(Math.floor(Math.random() * titles.length))}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L12.586 8l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414L7.414 12l.707.707a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Playlist Button */}
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  disabled={!isPlayerReady}
                  className="cyber-nav-button relative bg-transparent hover:bg-neonb/20 border border-neonb text-neonb font-bold py-1 px-1 transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Volume Control - collapsible */}
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
              
              {/* Title and Progress Bar */}
              <div className="flex flex-col space-y-1 min-w-0 flex-1">
                {/* Song Title with scroll animation */}
                <div 
                  ref={titleRef}
                  className="text-xs font-bold uppercase tracking-wider glow-text overflow-hidden whitespace-nowrap"
                  style={{ maxWidth: '200px', color: '#07f0ff' }}
                >
                  <div className="title-scroll">
                    {currentTitle}
                  </div>
                </div>
                
                {/* Simple Progress Bar */}
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
      
      {/* Volume Slider - positioned outside the main container to avoid Astro island containment */}
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

      {/* Playlist Menu - positioned above the radio */}
      {showPlaylist && (
        <div className="playlist-container fixed z-50 bottom-24 left-8">
          <div className="bg-dark border border-neonb p-3 rounded max-h-64 w-64 overflow-y-auto">
            <div className="text-xs font-bold text-neonb mb-2 uppercase tracking-wider">Playlist</div>
            <div className="space-y-1">
              {playlistTitles.map((title, index) => {
                const isCurrent = currentTitle === title;
                return (
                  <button
                    key={index}
                    onClick={() => playSongAtIndex(index)}
                    className={`w-full text-left p-2 text-xs hover:bg-neonb/20 transition-all duration-200 ${
                      isCurrent ? 'bg-neonb/30 text-neonb font-bold' : 'text-neonb'
                    }`}
                  >
                    {isCurrent ? '▶ ' : ''}{title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      <style jsx="true">{`
        .cyber-radio-container {
          filter: drop-shadow(0 0 10px #07f0ff);
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
        
        .glow-text {
          text-shadow: 0 0 5px #07f0ff, 0 0 10px #07f0ff, 0 0 15px #07f0ff;
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
          filter: drop-shadow(0 0 5px #07f0ff);
        }
        
        .playlist-container::-webkit-scrollbar {
          width: 4px;
        }
        
        .playlist-container::-webkit-scrollbar-track {
          background: #071016;
        }
        
        .playlist-container::-webkit-scrollbar-thumb {
          background: #07f0ff;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default CyberRadio;
