// ==UserScript==
// @name         🚀 Tool VieFaucet full version 
// @namespace    Diencode.ai
// @version      5.0.0
// @description  Tổng hợp Speed Hack, Auto PTC, và AI Captcha Solver (Visual Scan)
// @author       Dev Dien + scan.AI
// @match        *://viefaucet.com/*
// @match        *://*.viefaucet.com/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Logger Visual UI
    function log(msg, color) {
        console.log(`%c ${msg}`, `color:${color};font-weight:bold`);
        // Mini Toast UI
        let toast = document.getElementById('turbo-toast');
        if(!toast) {
            toast = document.createElement('div');
            toast.id = 'turbo-toast';
            // Cải thiện CSS cho UI toast
            toast.style.cssText = 'position:fixed;top:10px;right:10px;z-index:999999;background:rgba(0,0,0,0.8);color:white;padding:10px 15px;border-radius:8px;font-size:14px;pointer-events:none;max-width:300px;box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
            document.body.appendChild(toast);
        }
        
        // Thêm tin nhắn mới vào đầu
        const newMsgDiv = document.createElement('div');
        newMsgDiv.innerHTML = `<span style="color:${color}; display:block; padding: 2px 0;">${msg}</span>`;
        if (toast.firstChild) {
            toast.insertBefore(newMsgDiv, toast.firstChild);
        } else {
            toast.appendChild(newMsgDiv);
        }

        // Giữ lại tối đa 5 tin nhắn
        while(toast.children.length > 5) {
            toast.lastChild.remove();
        }
    }
    
    // **********************************************
    // LOG THÔNG BÁO ĐẶC BIỆT KHI SCRIPT BẮT ĐẦU CHẠY
    // **********************************************
    log("🇻🇳 Chào mừng, Diencode Dev 2025!", "#ff8c00"); 
    log("🚀 Script injector hook...", "#fff");


    // === MODULE 1: TIME WARP & STEALTH (Speed Hack) ===
    const SPEED_RATE = 50;
    const INVERSE_RATE = 1 / SPEED_RATE;

    function activateSpeedHack() {
        const win = unsafeWindow;
        const DOC = win.document;

        // Anti-Detection (Chống phát hiện ẩn tab)
        try {
            Object.defineProperty(DOC, 'hidden', { get: () => false, configurable: true });
            Object.defineProperty(DOC, 'visibilityState', { get: () => 'visible', configurable: true });
            // Đảm bảo focus
            Object.defineProperty(DOC, 'hasFocus', { get: () => true, configurable: true });

            // Block visibility events
            const originalAddEventListener = win.EventTarget.prototype.addEventListener;
            win.EventTarget.prototype.addEventListener = function(type, listener, options) {
                if (type === 'visibilitychange' || type === 'blur' || type === 'pagehide') return;
                return originalAddEventListener.apply(this, arguments);
            };
            log("🛡️ Anti-Detection kích hoạt!", "#00ff00");
        } catch (e) { console.error("Lỗi Anti-Detection:", e); }

        // Time Warping
        if (!win.Date) return;
        const DateOrigin = win.Date;
        const TimeOrigin = DateOrigin.now.bind(DateOrigin);
        let actualTimeOffset = 0;

        class MockDate extends DateOrigin {
            constructor(...args) {
                if (args.length === 0) {
                    const currentActualTime = TimeOrigin();
                    const timeDiff = currentActualTime - MockDate.lastActualTime;
                    actualTimeOffset += timeDiff * SPEED_RATE;
                    MockDate.lastActualTime = currentActualTime;
                    args.push(MockDate.lastModifiedTime + actualTimeOffset);
                }
                super(...args);
            }
            static now() {
                const currentActualTime = TimeOrigin();
                const timeDiff = currentActualTime - MockDate.lastActualTime;
                actualTimeOffset += timeDiff * SPEED_RATE;
                MockDate.lastActualTime = currentActualTime;
                return MockDate.lastModifiedTime + actualTimeOffset;
            }
        }
        MockDate.lastActualTime = TimeOrigin();
        MockDate.lastModifiedTime = TimeOrigin();
        win.Date = MockDate;

        // Hook Timers
        const setTimeoutOrigin = win.setTimeout;
        const setIntervalOrigin = win.setInterval;

        win.setTimeout = (callback, delay, ...args) => setTimeoutOrigin(callback, delay * INVERSE_RATE, ...args);
        win.setInterval = (callback, delay, ...args) => setIntervalOrigin(callback, delay * INVERSE_RATE, ...args);

        log(`⚡ Speed Hack x${SPEED_RATE} Active!`, "#ffff00");
    }


    // === MODULE 2: AUTO PTC CLICKER ===
    function runAutoPTC() {
        // Chỉ chạy khi ở trang PTC
        if (!window.location.pathname.includes('/ptc')) {
             setTimeout(runAutoPTC, 5000); // Check lại sau 5s
             return;
        }

        // Tìm nút có khả năng là nút xem quảng cáo
        const button = document.querySelector('.el-button.el-button--primary.claim-button') ||
                       document.querySelector('.el-button.el-button--primary[type="button"]');

        if (button && !button.disabled) {
            log("🖱️ Tìm thấy nút View PTC -> Click!", "#00ffff");
            button.click();
            // Đợi 1 giây sau khi click để load trang mới hoặc cập nhật trạng thái
            setTimeout(runAutoPTC, 1000); 
        } else {
            // Nếu không tìm thấy hoặc nút bị disable (đang loading)
            setTimeout(runAutoPTC, 3000);
        }
    }


    // === MODULE 3: CAPTCHA SOLVER (Hybrid AI) ===

    // 3.1 Fast Selector Logic
    function clickIfExists(selector, textIncludes = null) {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
            if (!textIncludes || el.textContent.includes(textIncludes)) {
                el.click();
                log(`✅ Quick Click: ${selector}`, "#00ff00");
                return true;
            }
        }
        return false;
    }

    function checkBasicCaptcha() {
        // HCaptcha/ReCaptcha checkbox (thường là div.check-box)
        const box = document.querySelector('.check-box');
        if (box) { box.click(); log("✅ Click checkbox captcha cơ bản", "#32cd32"); return true; }

        // Một số dạng nút verify nhanh
        const dot = document.querySelector('div.dot');
        if (dot) return clickIfExists('button', 'Verify');

        return false;
    }

    // 3.2 Visual Scan Logic (Upside Down Detection - Cho dạng 'Click hình ngược')
    async function visualScanAndSolve() {
        // Kiểm tra xem có đang ở màn hình giải Captcha hình ảnh không
        const images = document.querySelectorAll('.captcha-solver-container img, img[onclick*="verify"], .ant-image-img');
        if (images.length < 3) return false;

        log("👁️ Kích hoạt Visual Scan (Quét ảnh ngược)...", "#ff00ff");

        // Helper: Get Pixel Data (Chỉ trích xuất phần cần thiết)
        const getPixels = (img) => {
             return new Promise(resolve => {
                if(!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
                     // Thử tải lại ảnh nếu nó không hoàn thành (đôi khi xảy ra)
                     const tempImg = new Image();
                     tempImg.crossOrigin = "Anonymous";
                     tempImg.onload = () => {
                         try {
                            const c = document.createElement('canvas');
                            c.width = tempImg.naturalWidth; c.height = tempImg.naturalHeight;
                            const ctx = c.getContext('2d');
                            ctx.drawImage(tempImg, 0, 0);
                            resolve(ctx.getImageData(0,0,c.width,c.height));
                         } catch(e) { resolve(null); }
                     };
                     tempImg.onerror = () => resolve(null);
                     tempImg.src = img.src;
                } else {
                    try {
                        const c = document.createElement('canvas');
                        c.width = img.naturalWidth; c.height = img.naturalHeight;
                        const ctx = c.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(ctx.getImageData(0,0,c.width,c.height));
                    } catch(e) { resolve(null); }
                }
             });
        };

        // Helper: Calculate 'Bottom heaviness' (Trọng lượng phần dưới)
        const calcMass = (data) => {
             if(!data) return 0;
             let totalY = 0, count = 0;
             const { data: pixels, width } = data;
             
             for(let i=0; i < pixels.length; i+=4) {
                 // Đơn giản hóa: Nếu không phải nền trắng tinh (RGB > 240) thì tính
                 if (pixels[i] < 240 || pixels[i+1] < 240 || pixels[i+2] < 240) { 
                     const pixelIndex = i / 4;
                     const y = Math.floor(pixelIndex / width);
                     totalY += y;
                     count++;
                 }
             }
             // Trả về vị trí Y trung bình (tính từ 0 đến height-1)
             return count ? (totalY/count) : 0; 
        };

        let scores = [];
        for(let i=0; i<images.length; i++) {
            const data = await getPixels(images[i]);
            const mass = calcMass(data);
            if (mass > 0) {
                scores.push({ idx: i, mass: mass, el: images[i] });
            }
        }

        // Tìm hình có trọng tâm khác biệt nhất (Outlier)
        if(scores.length > 0) {
            // Tính độ lệch chuẩn (Standard Deviation)
            const sum = scores.reduce((a,b) => a + b.mass, 0);
            const avg = sum / scores.length;
            
            // Sắp xếp theo độ lệch lớn nhất so với giá trị trung bình
            scores.sort((a,b) => Math.abs(b.mass - avg) - Math.abs(a.mass - avg)); 

            const outlier = scores[0]; // Hình khác biệt nhất (có trọng tâm cao/thấp hơn hẳn)
            
            log(`🎯 Phát hiện hình khác biệt (Trọng tâm: ${outlier.mass.toFixed(1)}). Click!`, "#ff0000");
            
            // Đánh dấu hình để người dùng dễ nhìn thấy
            outlier.el.style.border = "3px dashed red";
            outlier.el.style.transition = "border 0.3s";
            
            // Thực hiện click
            outlier.el.click();

            // === AUTO VERIFY SAU KHI CHỌN HÌNH ===
            setTimeout(() => {
                const verifyBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent.trim().toLowerCase() === 'verify');
                if(verifyBtn) {
                     log("✅ Auto Click Verify Button...", "#00ff00");
                     verifyBtn.click();
                }
            }, 500);

            return true;
        }
        return false;
    }

    function autoCaptchaLoop() {
        // Chỉ chạy nếu đang ở trang có thể có captcha (Faucet, Shortlink, PTC View...)
        if (window.location.pathname.includes('/ptc') || 
            window.location.pathname.includes('/faucet') ||
            document.querySelector('.captcha-solver-container') ||
            document.querySelector('.el-dialog')) 
        {
            // Ưu tiên cách cơ bản trước
            if(!checkBasicCaptcha()) {
                // Nếu không tìm thấy, thử quét ảnh
                visualScanAndSolve();
            }
        }
        setTimeout(autoCaptchaLoop, 3000);
    }


    // INIT
    function init() {
        // Speed hack được kích hoạt ngay lập tức
        activateSpeedHack(); 
        
        // Bắt đầu các vòng lặp tự động sau một chút thời gian
        setTimeout(runAutoPTC, 3000);
        setTimeout(autoCaptchaLoop, 2000);
    }

    // Đảm bảo script chạy sớm nhất có thể
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
