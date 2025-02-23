class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;

  private constructor() {
    this.initializeSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initializeSounds() {
    const soundFiles = {
      victory: 'victory.mp3',
      gameOver: 'game-over.mp3',
      match: 'match.mp3',
      flip: 'flip.mp3'
    };

    // Créer les éléments Audio avec les chemins corrects
    this.sounds = Object.entries(soundFiles).reduce((acc, [key, filename]) => {
      const audio = new Audio();
      audio.src = `/assets/sounds/${filename}`;
      return { ...acc, [key]: audio };
    }, {});

    // Précharger les sons
    Object.values(this.sounds).forEach(sound => {
      sound.preload = 'auto'; // Force le préchargement
      sound.load();
    });
  }

  public async play(soundName: 'victory' | 'gameOver' | 'match' | 'flip') {
    if (this.isMuted || !this.sounds[soundName]) return;

    try {
      // Arrêter et réinitialiser le son avant de le jouer
      const sound = this.sounds[soundName];
      sound.currentTime = 0;

      // Ajuster le volume pour certains sons
      switch (soundName) {
        case 'match':
          sound.volume = 0.6;
          break;
        case 'flip':
          sound.volume = 0.3;
          break;
        default:
          sound.volume = 1.0;
      }

      // Vérifier si le son est chargé
      if (sound.readyState >= 2) {
        await sound.play();
      } else {
        // Si le son n'est pas chargé, on attend qu'il le soit
        await new Promise((resolve, reject) => {
          sound.oncanplay = resolve;
          sound.onerror = reject;
          sound.load();
        });
        await sound.play();
      }
    } catch (error) {
      console.warn(`Erreur lors de la lecture du son ${soundName}:`, error);
      // Tentative de rechargement du son en cas d'erreur
      this.sounds[soundName].load();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export default SoundManager; 