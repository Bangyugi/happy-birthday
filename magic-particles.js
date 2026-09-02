/**
 * Magic Cosmic Stardust & Constellation Particle Engine
 * Multi-stage cinematic progression: slow suspenseful opening, gradual light rise,
 * sequential constellation line drawing, and full galaxy vortex flow.
 */

class CosmicParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.isActive = false;
    this.particles = [];
    this.sparkles = [];
    this.nebulaClouds = [];
    this.constellations = [];
    this.maxParticles = 85; // Optimized lightweight particle limit to prevent lag
    this.animId = null;
    
    // Timeline variables
    this.startTime = 0;
    this.elapsedTime = 0;
    this.sequencePhase = 'idle';
    this.intensity = 0;
    this.targetIntensity = 0;
    this.hasTriggeredCard = false;
    this.onConstellationsComplete = null;
    
    // Origin inside the open memory box opening cavity (SVG coordinates 1920x1080)
    this.boxOrigin = { x: 1138, y: 585 };

    // Vibrant cosmic pastel stardust palette
    this.colors = [
      { r: 84,  g: 252, b: 253 }, // Cyan Turquoise
      { r: 255, g: 111, b: 216 }, // Neon Magenta
      { r: 255, g: 215, b: 0   }, // Radiant Gold
      { r: 202, g: 168, b: 255 }, // Soft Lavender
      { r: 80,  g: 250, b: 123 }, // Mint Emerald
      { r: 255, g: 255, b: 255 }, // Diamond Pure White
      { r: 255, g: 170, b: 100 }, // Warm Pastel Peach
      { r: 130, g: 220, b: 255 }  // Sky Celestial Blue
    ];

    this.initConstellations();
    this.initEventListeners();
    this.resize();
  }

  initConstellations() {
    // Exact geometric constellation patterns matching reference images for Virgo (Xử Nữ) and Leo (Sư Tử)
    this.constellations = [
      // Constellation 1: Virgo (Xử Nữ) - Exact structure matching reference image (Upper Left)
      {
        name: 'Virgo',
        startSec: 4.8,
        drawDuration: 1.8,
        alpha: 0,
        nodes: [
          { x: 235, y: 185, litProgress: 0 },                                    // 0: Far Top-Left
          { x: 320, y: 205, litProgress: 0 },                                    // 1: Mid Top-Left
          { x: 375, y: 225, litProgress: 0, isMajor: true },                     // 2: Top-Left Torso
          { x: 375, y: 345, litProgress: 0, isMajor: true },                     // 3: Bottom-Center Torso
          { x: 230, y: 265, litProgress: 0 },                                    // 4: Far Bottom-Left
          { x: 285, y: 275, litProgress: 0 },                                    // 5: Knee / Bend
          { x: 290, y: 320, litProgress: 0 },                                    // 6: Hip / Waist
          { x: 450, y: 210, litProgress: 0 },                                    // 7: Top-Right Torso
          { x: 446, y: 135, litProgress: 0 },                                    // 8: Top Antenna / Head
          { x: 475, y: 265, litProgress: 0 },                                    // 9: Bottom-Right Torso
          { x: 518, y: 260, litProgress: 0 },                                    // 10: Mid Right Arm
          { x: 615, y: 210, litProgress: 0, isMajor: true, name: 'Spica' }       // 11: Far Right Star (Spica)
        ],
        edges: [
          [0, 1],   // Top-left arm: 0 -> 1
          [1, 2],   // Top-left arm: 1 -> 2
          [4, 5],   // Bottom-left leg: 4 -> 5
          [5, 6],   // Bottom-left leg: 5 -> 6
          [6, 3],   // Bottom-left leg: 6 -> 3
          [2, 3],   // Torso vertical center spine: 2 -> 3
          [2, 7],   // Torso top bar: 2 -> 7
          [7, 8],   // Top vertical line to head: 7 -> 8
          [7, 9],   // Torso right side: 7 -> 9
          [9, 3],   // Torso bottom-right diagonal: 9 -> 3
          [9, 10],  // Right arm: 9 -> 10
          [10, 11]  // Right arm: 10 -> 11
        ]
      },
      // Constellation 2: Leo (Sư Tử) - Exact structure matching reference image (Upper Right)
      {
        name: 'Leo',
        startSec: 5.8,
        drawDuration: 1.8,
        alpha: 0,
        nodes: [
          { x: 1290, y: 310, litProgress: 0, isMajor: true, name: 'Denebola' }, // 0: Tail Tip (Bottom-left apex)
          { x: 1395, y: 220, litProgress: 0 },                                   // 1: Upper Back (Zosma)
          { x: 1415, y: 280, litProgress: 0 },                                   // 2: Lower Back (Chertan)
          { x: 1575, y: 190, litProgress: 0, isMajor: true },                    // 3: Mane (Algieba)
          { x: 1570, y: 145, litProgress: 0 },                                   // 4: Upper Neck / Crest (Adhafera)
          { x: 1630, y: 100, litProgress: 0 },                                   // 5: Top Head (Rasalas)
          { x: 1665, y: 120, litProgress: 0 },                                   // 6: Snout (Algenubi)
          { x: 1630, y: 215, litProgress: 0 },                                   // 7: Mid-Right Chest (Eta)
          { x: 1655, y: 265, litProgress: 0, isMajor: true, name: 'Regulus' }   // 8: Bottom-Right Paw (Regulus)
        ],
        edges: [
          [0, 1], // Tail Tip -> Upper Back
          [0, 2], // Tail Tip -> Lower Back
          [1, 2], // Upper Back -> Lower Back
          [1, 3], // Upper Back -> Mane (Top body line)
          [2, 8], // Lower Back -> Front Paw (Bottom belly line)
          [3, 4], // Mane -> Upper Neck
          [4, 5], // Upper Neck -> Top Head
          [5, 6], // Top Head -> Snout
          [3, 7], // Mane -> Mid-Right Chest
          [7, 8]  // Mid-Right Chest -> Front Paw
        ]
      }
    ];
  }

  initEventListeners() {
    window.addEventListener('resize', () => this.resize());
    this.mouse = { x: -1000, y: -1000, isOver: false };
    
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = 1920 / rect.width;
      const scaleY = 1080 / rect.height;
      this.mouse.x = (e.clientX - rect.left) * scaleX;
      this.mouse.y = (e.clientY - rect.top) * scaleY;
      this.mouse.isOver = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.isOver = false;
    });
  }

  resize() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = 1920 * dpr;
    this.canvas.height = 1080 * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  start() {
    this.isActive = true;
    this.sequencePhase = 'opening';
    this.startTime = performance.now();
    this.targetIntensity = 1;
    this.hasTriggeredCard = false;
    this.hasPlayedSurgeSound = false;
    
    // Reset constellation lit progress
    for (const c of this.constellations) {
      c.alpha = 0;
      for (const node of c.nodes) {
        node.litProgress = 0;
        node.hasPlayedSound = false;
      }
    }

    if (!this.animId) {
      this.loop();
    }
  }

  stop() {
    this.sequencePhase = 'closing';
    this.targetIntensity = 0;
    this.hasTriggeredCard = false;
    this.hasPlayedSurgeSound = false;
  }

  spawnPioneerParticle() {
    // Gentle, slow pioneer particles in the early whispering stage
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 0.6;
    const speed = 0.8 + Math.random() * 1.8;

    return {
      x: this.boxOrigin.x + (Math.random() - 0.5) * 140,
      y: this.boxOrigin.y - 12 + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.4,
      size: 2 + Math.random() * 3,
      color: color,
      alpha: 0,
      maxAlpha: 0.85,
      life: 0,
      maxLife: 180 + Math.random() * 100,
      vortex: (Math.random() - 0.5) * 0.6,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.04,
      isSparkle: Math.random() < 0.35,
      sparkleScale: 1.2
    };
  }

  spawnVortexParticle() {
    // Full grand galactic swirling particles
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.3;
    const speed = 2.5 + Math.random() * 7.0;
    
    const streamType = Math.random();
    let vortexTendency = 0;
    if (streamType < 0.45) vortexTendency = -1.25; // Flow left toward moonlit window
    else if (streamType < 0.8) vortexTendency = 0.85; // Flow right toward grand bookshelf
    else vortexTendency = -0.15; // Flow straight up celestial center

    return {
      x: this.boxOrigin.x + (Math.random() - 0.5) * 180,
      y: this.boxOrigin.y - 10 + (Math.random() - 0.5) * 12,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
      vy: Math.sin(angle) * speed - Math.random() * 3,
      size: 1.5 + Math.random() * 4.5,
      color: color,
      alpha: 0,
      maxAlpha: 0.65 + Math.random() * 0.35,
      life: 0,
      maxLife: 140 + Math.random() * 180,
      vortex: vortexTendency,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.08,
      isSparkle: Math.random() < 0.3,
      sparkleScale: 1 + Math.random() * 1.5
    };
  }

  spawnNebula() {
    const color = this.colors[Math.floor(Math.random() * 4)];
    return {
      x: this.boxOrigin.x + (Math.random() - 0.5) * 140,
      y: this.boxOrigin.y - 30,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -1.2 - Math.random() * 1.5,
      radius: 50 + Math.random() * 70,
      color: color,
      alpha: 0,
      maxAlpha: 0.18 + Math.random() * 0.14,
      life: 0,
      maxLife: 220 + Math.random() * 160
    };
  }

  update(now) {
    this.elapsedTime = (now - this.startTime) / 1000; // in seconds

    // Smooth intensity interpolation
    this.intensity += (this.targetIntensity - this.intensity) * 0.035;

    // Multi-stage particle spawning choreography:
    if (this.sequencePhase === 'opening' || this.sequencePhase === 'active') {
      const t = this.elapsedTime;

      // Trigger grand cosmic chime cascade when galaxy vortex begins swelling
      if (!this.hasPlayedSurgeSound && t > 3.0) {
        this.hasPlayedSurgeSound = true;
        if (window.soundEngine) {
          window.soundEngine.playCosmicSurge();
        }
      }

      if (t > 1.2 && t <= 3.2) {
        // Stage 1: Pioneer Whispers (T = 1.2s to 3.2s) - Light slowly rising
        if (Math.random() < 0.25 && this.particles.length < 15) {
          this.particles.push(this.spawnPioneerParticle());
        }
      } else if (t > 3.2 && t <= 5.0) {
        // Stage 2: Gathering Dawn (T = 3.2s to 5.0s) - Rising light column & expanding flow
        if (Math.random() < 0.6 && this.particles.length < this.maxParticles) {
          this.particles.push(this.spawnVortexParticle());
        }
        if (Math.random() < 0.04 && this.nebulaClouds.length < 4) {
          this.nebulaClouds.push(this.spawnNebula());
        }
      } else if (t > 5.0) {
        // Stage 3: Full Grand Galactic Vortex (T > 5.0s) - Optimized steady stream
        this.sequencePhase = 'active';
        if (Math.random() < 0.85 && this.particles.length < this.maxParticles) {
          this.particles.push(this.spawnVortexParticle());
        }
        if (Math.random() < 0.06 && this.nebulaClouds.length < 6) {
          this.nebulaClouds.push(this.spawnNebula());
        }
      }
    }

    // Update Nebula Clouds
    for (let i = this.nebulaClouds.length - 1; i >= 0; i--) {
      const n = this.nebulaClouds[i];
      n.life++;
      n.x += n.vx;
      n.y += n.vy;
      n.radius += 0.45;

      const progress = n.life / n.maxLife;
      if (progress < 0.3) {
        n.alpha = (progress / 0.3) * n.maxAlpha;
      } else {
        n.alpha = (1 - (progress - 0.3) / 0.7) * n.maxAlpha;
      }

      if (n.life >= n.maxLife) {
        this.nebulaClouds.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      // Vortex flow field
      const timeFactor = p.life * 0.035;
      const swirlX = Math.sin(timeFactor + p.y * 0.005) * 1.8 * p.vortex;
      const swirlY = Math.cos(timeFactor * 0.8) * 0.6;
      
      p.vy *= 0.985;
      p.vx *= 0.985;
      p.vy -= 0.04;

      // Mouse interactive stirring
      if (this.mouse.isOver) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 35000 && distSq > 10) {
          const force = (1 - Math.sqrt(distSq) / 187) * 2;
          p.vx += (dx / Math.sqrt(distSq)) * force;
          p.vy += (dy / Math.sqrt(distSq)) * force;
        }
      }

      p.x += p.vx + swirlX;
      p.y += p.vy + swirlY;
      p.spin += p.spinSpeed;

      const progress = p.life / p.maxLife;
      const shimmer = 0.8 + Math.sin(p.life * 0.25 + p.spin) * 0.2;
      if (progress < 0.15) {
        p.alpha = (progress / 0.15) * p.maxAlpha * shimmer;
      } else {
        p.alpha = (1 - (progress - 0.15) / 0.85) * p.maxAlpha * shimmer;
      }

      if (p.life >= p.maxLife || p.y < -50 || p.x < -100 || p.x > 2020) {
        this.particles.splice(i, 1);
      }
    }

    // Update Constellations Sequential Drawing
    const curTime = this.elapsedTime;
    for (const c of this.constellations) {
      if (this.targetIntensity > 0 && curTime >= c.startSec) {
        const progress = Math.min(1, (curTime - c.startSec) / c.drawDuration);
        c.alpha = progress * 0.9;
        
        // Progressively light each node and line
        for (let j = 0; j < c.nodes.length; j++) {
          const nodeDelay = j / c.nodes.length;
          if (progress >= nodeDelay) {
            c.nodes[j].litProgress = Math.min(1, (progress - nodeDelay) * c.nodes.length);
            if (!c.nodes[j].hasPlayedSound && c.nodes[j].litProgress > 0.08) {
              c.nodes[j].hasPlayedSound = true;
              if (window.soundEngine) {
                window.soundEngine.playStarDing(j);
              }
            }
          }
        }
      } else if (this.targetIntensity === 0) {
        c.alpha *= 0.94;
      }
    }

    // Trigger greeting card emergence when constellations complete
    if (!this.hasTriggeredCard && this.targetIntensity > 0 && curTime >= 7.8) {
      this.hasTriggeredCard = true;
      if (typeof this.onConstellationsComplete === 'function') {
        this.onConstellationsComplete();
      }
    }

    // Stop animation loop when fully quiet
    if (this.targetIntensity === 0 && this.intensity < 0.005 && this.particles.length === 0 && this.nebulaClouds.length === 0) {
      this.isActive = false;
      this.animId = null;
    }
  }

  draw4PointStar(cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
    const ctx = this.ctx;
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
    ctx.shadowBlur = outerRadius * 2;
    ctx.fill();
    ctx.restore();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 1920, 1080);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // 1. Draw Nebula Clouds
    for (const n of this.nebulaClouds) {
      if (n.alpha <= 0.001) continue;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
      grad.addColorStop(0, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${n.alpha})`);
      grad.addColorStop(0.5, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${n.alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Constellations Sequentially (Nodes and Connecting Glowing Lines)
    for (const c of this.constellations) {
      if (c.alpha <= 0.01) continue;

      // Draw lines between connected nodes
      for (const [startIdx, endIdx] of c.edges) {
        const n1 = c.nodes[startIdx];
        const n2 = c.nodes[endIdx];
        const lineProgress = Math.min(n1.litProgress, n2.litProgress);
        if (lineProgress <= 0.01) continue;

        const lx = n1.x + (n2.x - n1.x) * lineProgress;
        const ly = n1.y + (n2.y - n1.y) * lineProgress;

        ctx.strokeStyle = `rgba(185, 225, 255, ${c.alpha * 0.65 * lineProgress})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        // Glowing spark at leading drawing tip
        if (lineProgress < 0.99) {
          ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
          ctx.beginPath();
          ctx.arc(lx, ly, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw glowing stars
      for (const n of c.nodes) {
        if (n.litProgress <= 0.01) continue;
        const starA = c.alpha * n.litProgress;
        const scale = n.isMajor ? 1.35 : 1.0;

        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16 * scale);
        halo.addColorStop(0, `rgba(255, 255, 255, ${starA})`);
        halo.addColorStop(0.35, `rgba(130, 220, 255, ${starA * 0.85})`);
        halo.addColorStop(1, `rgba(130, 220, 255, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16 * scale, 0, Math.PI * 2);
        ctx.fill();

        this.draw4PointStar(n.x, n.y, 4, 11 * scale * n.litProgress, 2.8 * scale * n.litProgress, { r: 255, g: 255, b: 255 }, starA);
      }
    }

    // 3. Draw Core Light Burst
    if (this.intensity > 0.01 && this.elapsedTime > 1.2) {
      const coreIntensity = Math.min(1, (this.elapsedTime - 1.2) / 2.5) * this.intensity;
      const coreGrad = ctx.createRadialGradient(
        this.boxOrigin.x, this.boxOrigin.y, 10,
        this.boxOrigin.x, this.boxOrigin.y, 220 * coreIntensity
      );
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * coreIntensity})`);
      coreGrad.addColorStop(0.25, `rgba(180, 240, 255, ${0.75 * coreIntensity})`);
      coreGrad.addColorStop(0.6, `rgba(255, 140, 220, ${0.4 * coreIntensity})`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(this.boxOrigin.x, this.boxOrigin.y, 220 * coreIntensity, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Draw Stardust Particles & 4-Point Sparkles
    for (const p of this.particles) {
      if (p.alpha <= 0.001) continue;

      if (p.isSparkle) {
        const outerR = p.size * 3.2 * p.sparkleScale;
        const innerR = p.size * 0.8;
        this.draw4PointStar(p.x, p.y, 4, outerR, innerR, p.color, p.alpha);
      } else {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.8);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
        grad.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  loop(now = performance.now()) {
    if (!this.isActive && this.intensity < 0.005 && this.particles.length === 0) {
      this.ctx.clearRect(0, 0, 1920, 1080);
      this.animId = null;
      return;
    }

    this.update(now);
    this.render();
    this.animId = requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
}

// Global initialization
window.CosmicParticleEngine = CosmicParticleEngine;
