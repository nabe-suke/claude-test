/**
 * メインビジュアルのスライドショー機能
 * 自動スライド、インジケータークリック、スワイプ操作に対応
 */
class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // インジケーターのクリックイベント
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // スワイプ機能を追加
        this.initSwipe();
        
        // 自動スライド開始
        this.startAutoSlide();
        
        // ホバー時に自動スライド停止
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => this.stopAutoSlide());
            hero.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    goToSlide(slideIndex) {
        const prevSlide = this.currentSlide;
        this.currentSlide = slideIndex;
        
        // 全スライドの状態をリセット
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index === prevSlide) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });
        
        // インジケーター更新
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    initSwipe() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        let startX = 0;
        let startY = 0;
        
        hero.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        hero.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    startAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// スムーススクロール機能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ナビゲーションバーのスクロール効果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// カードのアニメーション
function initCardAnimations() {
    const cards = document.querySelectorAll('.content-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}



// モバイルメニュー機能
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

/**
 * デザイン例の無限ループギャラリー
 * 自動スクロール + ドラッグ/スワイプ操作対応
 * 2セット分の画像を使用してシームレスなループを実現
 */
class InfiniteGallery {
    constructor() {
        this.container = document.querySelector('.scrolling-gallery');
        this.track = document.querySelector('.gallery-track');
        this.updateItemWidth();
        this.offset = 0;
        this.animationId = null;
        this.autoScrollSpeed = 0.5;
        this.isDragging = false;
        this.startX = 0;
        this.init();
    }
    
    /**
     * 画面サイズに応じてアイテム幅を更新
     * モバイル: 232px (200px + 32px gap)
     * デスクトップ: 282px (250px + 32px gap)
     */
    updateItemWidth() {
        this.itemWidth = window.innerWidth <= 768 ? 232 : 282;
        const itemCount = this.track.children.length / 2;
        this.loopWidth = this.itemWidth * itemCount;
    }
    
    init() {
        const itemCount = this.track.children.length / 2;
        this.loopWidth = this.itemWidth * itemCount;
        this.initEvents();
        this.startAutoScroll();
        
        window.addEventListener('resize', () => {
            this.updateItemWidth();
        });
    }
    
    /**
     * マウス・タッチイベントの初期化
     * ドラッグ&スワイプ操作に対応
     */
    initEvents() {
        this.container.addEventListener('mousedown', this.onDragStart.bind(this));
        this.container.addEventListener('mousemove', this.onDragMove.bind(this));
        this.container.addEventListener('mouseup', this.onDragEnd.bind(this));
        this.container.addEventListener('mouseleave', this.onDragEnd.bind(this));
        this.container.addEventListener('touchstart', this.onDragStart.bind(this));
        this.container.addEventListener('touchmove', this.onDragMove.bind(this));
        this.container.addEventListener('touchend', this.onDragEnd.bind(this));
    }
    
    onDragStart(e) {
        this.isDragging = true;
        this.container.classList.add('grabbing');
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.stopAutoScroll();
    }
    
    onDragMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const delta = currentX - this.startX;
        this.offset += delta;
        this.startX = currentX;
        this.updatePosition();
    }
    
    onDragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.container.classList.remove('grabbing');
        this.startAutoScroll();
    }
    
    /**
     * ギャラリーの位置を更新
     * 7枚目の後に瞬時に1枚目に戻ることでシームレスな無限ループを実現
     */
    updatePosition() {
        if (this.offset <= -this.loopWidth) {
            this.offset += this.loopWidth;
        } else if (this.offset > 0) {
            this.offset -= this.loopWidth;
        }
        this.track.style.transform = `translateX(${this.offset}px)`;
    }
    
    startAutoScroll() {
        if (this.animationId) return;
        const animate = () => {
            if (!this.isDragging) {
                this.offset -= this.autoScrollSpeed;
                this.updatePosition();
            }
            this.animationId = requestAnimationFrame(animate);
        };
        this.animationId = requestAnimationFrame(animate);
    }
    
    stopAutoScroll() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// DOMContentLoaded時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // スライドショー初期化
    if (document.querySelector('.slideshow-container')) {
        new Slideshow();
    }
    
    // ギャラリー初期化
    if (document.querySelector('.gallery-track')) {
        new InfiniteGallery();
    }
    
    // その他の機能初期化
    initSmoothScroll();
    initNavbarScroll();
    initCardAnimations();
    initMobileMenu();
});