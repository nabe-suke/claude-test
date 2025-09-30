// スライドショー機能
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
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
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// DOMContentLoaded時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // スライドショー初期化
    if (document.querySelector('.slideshow-container')) {
        new Slideshow();
    }
    
    // その他の機能初期化
    initSmoothScroll();
    initNavbarScroll();
    initCardAnimations();
    initMobileMenu();
});