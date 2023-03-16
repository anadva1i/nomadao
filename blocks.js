window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
window.isiOS = !1;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.isiOS = !0
}
window.isiOSVersion = '';
if (window.isiOS) {
    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (version !== null) {
        window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]
    }
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t830_init(recid) {
    var rec = document.getElementById('rec' + recid);
    var allRec = document.getElementById('allrecords');
    if (!allRec || !rec)
        return;
    var panel = rec.querySelector('.t830__panel');
    var overlay = rec.querySelector('.t830m__overlay');
    var menu = rec.querySelector('.t830m');
    var submenu = rec.querySelector('.t830m__submenu');
    var burger = rec.querySelector('.t830__side .t830__burger');
    var menuItemList = rec.querySelectorAll('.t830m__list-title a');
    var submenuItemList = rec.querySelectorAll('.t830m__submenu-item a');
    t830_initMenu(rec, menu, burger, overlay);
    t830_removePadding(rec, allRec);
    t830_calcCol(rec, menu, allRec, !1);
    t_onFuncLoad('t_menu__highlightActiveLinks', function() {
        t_menu__highlightActiveLinks('.t830m__list a')
    });
    t830_openSubmenu(rec);
    t830_hoverShowMenu(rec, menu, panel, overlay, burger);
    window.addEventListener('resize', function() {
        t830_calcCol(rec, menu, allRec, !0);
        t830_removePadding(rec, allRec);
        if (menu && menu.classList.contains('t830m_close') && window.innerWidth > 1499) {
            if (overlay)
                overlay.classList.remove('t830m__menu_show')
        }
    });
    if (submenu && submenu.classList.contains('t830m__submenu_close')) {
        t830_toggleMenu(rec)
    }
    if (window.innerWidth > 1199) {
        t830_scrollSideMenu(rec)
    }
    var isHashNotEmpty = window.location.hash.length !== 0;
    Array.prototype.forEach.call(menuItemList, function(menuItem) {
        menuItem.addEventListener('click', function() {
            if (isHashNotEmpty) {
                Array.prototype.forEach.call(menuItemList, function(menuEl) {
                    menuEl.classList.remove('t-active')
                });
                menuItem.classList.add('t-active')
            }
        })
    });
    Array.prototype.forEach.call(submenuItemList, function(submenuItem) {
        submenuItem.addEventListener('click', function() {
            if (isHashNotEmpty) {
                Array.prototype.forEach.call(submenuItemList, function(submenuEl) {
                    submenuEl.classList.remove('t-active')
                });
                submenuItem.classList.add('t-active')
            }
        })
    });
    t_onFuncLoad('t_menu__findAnchorLinks', function() {
        t_menu__findAnchorLinks(recid, '.t830m__list a')
    })
}
function t830_calcCol(rec, menu, allrecords, isResized) {
    if (window.innerWidth <= 1199 || !menu || window.getComputedStyle(rec).display === 'none')
        return;
    var label = document.querySelector('.t-tildalabel');
    if (menu.classList.contains('t830m_open')) {
        if (allrecords)
            allrecords.classList.add('t830__allrecords_padd-small');
        if (label)
            label.classList.add('t830__t-tildalabel_padd-small')
    } else {
        if (allrecords)
            allrecords.classList.add('t830__allrecords_padd');
        if (label)
            label.classList.add('t830__t-tildalabel_padd')
    }
    if (isResized)
        return;
    var event = document.createEvent('Event');
    event.initEvent('allRecPaddingInit', !0, !0);
    if (allrecords)
        allrecords.dispatchEvent(event)
}
function t830_toggleMenu(rec) {
    var titleList = rec.querySelectorAll('.t830m__list-title_toggle');
    Array.prototype.forEach.call(titleList, function(listTitle) {
        listTitle.addEventListener('click', function() {
            var submenu = listTitle.nextElementSibling;
            var textTitle = listTitle.querySelector('.t830m__list-title-text');
            t830_slideToggle(submenu);
            if (textTitle)
                textTitle.classList.toggle('t830m__list-title-text_opacity');
            if (textTitle)
                textTitle.classList.toggle('t-menu__link-item')
        })
    })
}
function t830_openSubmenu(rec) {
    var activeLink = rec.querySelector('.t830m__submenu-item a.t-active');
    var submenu = activeLink ? activeLink.closest('.t830m__submenu') : null;
    if (submenu)
        submenu.style.display = 'block'
}
function t830_hoverShowMenu(rec, menu, panel, overlay, burger) {
    if (window.innerWidth <= 1199 || !panel || !panel.classList.contains('t830__panel_hover'))
        return;
    panel.addEventListener('mouseenter', function() {
        if (menu)
            menu.classList.add('t830m__menu_show');
        if (burger)
            burger.classList.add('t830__burger_open');
        if (overlay)
            overlay.classList.add('t830m__overlay_hover')
    });
    if (menu) {
        menu.addEventListener('mouseleave', function() {
            menu.classList.remove('t830m__menu_show');
            if (burger)
                burger.classList.remove('t830__burger_open')
        })
    }
    if (overlay) {
        overlay.addEventListener('mouseenter', function() {
            overlay.classList.remove('t830m__overlay_hover');
            if (burger)
                burger.classList.remove('t830__burger_open');
            if (menu)
                menu.classList.remove('t830m__menu_show')
        })
    }
    var menuLinks = menu.querySelectorAll('a');
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('t830m__menu_show');
            if (burger)
                burger.classList.remove('t830__burger_open')
        })
    });
    if (burger) {
        burger.addEventListener('click', function() {
            if (burger.classList.contains('t830__burger_open')) {
                t830_closeMenu(rec, menu, overlay);
                burger.classList.remove('t830__burger_open')
            } else {
                burger.classList.add('t830__burger_open');
                if (menu)
                    menu.classList.add('t830m__menu_show');
                if (overlay)
                    overlay.classList.add('t830m__overlay_hover')
            }
        })
    }
}
function t830_showMenu(rec, menu, burger, overlay) {
    var panel = rec.querySelector('.t830__panel');
    document.body.classList.add('t830__body_menushowed');
    if (overlay)
        overlay.classList.add('t830m__menu_show');
    if (menu)
        menu.classList.add('t830m__menu_show');
    var closedMenuEls = rec.querySelectorAll('.t830m__overlay, .t830m__close, a[href*="#"]');
    closedMenuEls = Array.prototype.filter.call(closedMenuEls, function(el) {
        return !(el.classList.contains('tooltipstered') || el.classList.contains('t794__tm-link') || el.classList.contains('t978__tm-link') || el.classList.contains('t966__tm-link'))
    });
    closedMenuEls.forEach(function(el) {
        el.addEventListener('click', function() {
            t830_closeMenu(rec, menu, overlay);
            if (burger)
                burger.classList.remove('t830__burger_open')
        })
    });
    if (panel)
        panel.classList.add('t830__panel_close');
    var popupBg = document.querySelector('.t-site-search-popup__background');
    document.addEventListener('keydown', function(e) {
        if (e.keyCode !== 27 || popupBg)
            return;
        document.body.classList.remove('t830__body_menushowed');
        if (menu)
            menu.classList.remove('t830m__menu_show');
        if (burger)
            burger.classList.remove('t830__burger_open');
        if (overlay)
            overlay.classList.remove('t830m__menu_show')
    })
}
function t830_closeMenu(rec, menu, overlay) {
    var panel = rec.querySelector('.t830__panel');
    if (menu && menu.classList.contains('t830m_open') && window.innerWidth < 1500) {
        if (panel)
            panel.classList.remove('t830__panel_close')
    }
    document.body.classList.remove('t830__body_menushowed');
    if (menu)
        menu.classList.remove('t830m__menu_show');
    if (overlay)
        overlay.classList.remove('t830m__menu_show')
}
function t830_initMenu(rec, menu, burger, overlay) {
    if (!rec)
        return;
    var panel = rec.querySelector('.t830__panel');
    var menuContent = rec.querySelector('.t830__menu__content');
    if (typeof jQuery !== 'undefined') {
        $('.t830').bind('clickedAnchorInTooltipMenu', function() {
            t830_closeMenu(rec, menu, overlay)
        })
    } else {
        var menuBlock = document.querySelector('.t830');
        if (menuBlock) {
            menuBlock.addEventListener('clickedAnchorInTooltipMenu', function() {
                t830_closeMenu(rec, menu, overlay)
            })
        }
    }
    if (!panel || !menuContent || !menu)
        return;
    if (panel.classList.contains('t830__panel_click') || (panel.classList.contains('t830__panel_hover') && window.innerWidth <= 1199)) {
        menuContent.addEventListener('click', function(e) {
            if (menu.classList.contains('t830m__menu_show')) {
                if (burger)
                    burger.classList.remove('t830__burger_open');
                t830_closeMenu(rec, menu, overlay)
            } else {
                if (burger)
                    burger.classList.add('t830__burger_open');
                t830_showMenu(rec, menu, burger, overlay)
            }
        })
    }
}
function t830_scrollSideMenu(rec) {
    var container = rec ? rec.querySelector('.t830m__container') : null;
    if (!container)
        return;
    var events = ['scroll', 'wheel', 'DOMMouseScroll', 'mousewheel'];
    events.forEach(function(event) {
        container.addEventListener(event, function(e) {
            var searchResult = rec.querySelector('.t-site-search-dm');
            if (!searchResult) {
                t830_stopScroll(container, e)
            }
        })
    })
}
function t830_stopScroll(container, eventScroll) {
    var scrollTop = container.scrollTop;
    var scrollHeight = container.scrollHeight;
    var height = container.offsetHeight;
    var delta = eventScroll.type === 'DOMMouseScroll' ? eventScroll.detail * -40 : eventScroll.wheelDelta;
    var up = delta > 0;
    var prevent = function() {
        eventScroll.stopPropagation();
        eventScroll.preventDefault();
        eventScroll.returnValue = !1;
        return !1
    };
    if (!up && -delta > scrollHeight - height - scrollTop) {
        container.scrollTo(0, scrollHeight);
        return prevent()
    } else if (up && delta > scrollTop) {
        container.scrollTo(0, 0);
        return prevent()
    }
}
function t830_removePadding(rec, allrecords) {
    if (!allrecords || !rec || window.getComputedStyle(rec).display !== 'none')
        return;
    allrecords.style.paddingLeft = '0';
    var label = document.querySelector('.t-tildalabel');
    if (label)
        label.style.paddingLeft = '0'
}
function t830_slideToggle(target) {
    if (!target)
        return;
    if (target.getAttribute('data-slide') === 'y')
        return;
    if (window.getComputedStyle(target).display === 'none') {
        return t830_slideDown(target)
    } else {
        return t830_slideUp(target)
    }
}
function t830_slideUp(target) {
    if (!target)
        return;
    var step = target.offsetHeight / 30;
    var difference = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.setAttribute('data-slide', 'y');
    var timerID = setInterval(function() {
        difference -= step;
        target.style.height = difference + 'px';
        if (difference <= 0) {
            target.style.height = '';
            target.style.overflow = '';
            target.style.display = 'none';
            target.removeAttribute('data-slide');
            clearInterval(timerID)
        }
    }, 10)
}
function t830_slideDown(target) {
    if (!target)
        return;
    target.style.display = '';
    var currentDisplayValue = window.getComputedStyle(target).display;
    target.style.display = currentDisplayValue === 'none' ? 'block' : currentDisplayValue;
    var targetHeight = target.offsetHeight;
    target.style.height = '0';
    target.style.overflow = 'hidden';
    target.setAttribute('data-slide', 'y');
    var step = targetHeight / 30;
    var difference = 0;
    var timerID = setInterval(function() {
        target.style.height = difference + 'px';
        difference += step;
        if (difference >= targetHeight) {
            target.style.height = '';
            target.style.overflow = '';
            target.removeAttribute('data-slide');
            clearInterval(timerID)
        }
    }, 10)
}
function t213_init(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = document.getElementById('t213-marker' + recId);
    var minScreenWidth = rec.getAttribute('data-screen-min');
    var maxScreenWidth = rec.getAttribute('data-screen-max');
    var windowWidth = window.innerWidth;
    if (minScreenWidth && windowWidth < parseInt(minScreenWidth, 10))
        return;
    if (maxScreenWidth && windowWidth > parseInt(maxScreenWidth, 10))
        return;
    var timer;
    var bgColor = container.getAttribute('data-bg-color');
    var documentBody = document.body;
    documentBody.style.transition = 'background-color 1s linear';
    if (window.t213higher === undefined) {
        window.t213higher = 1000000
    }
    var containerOffsetTop = container.getBoundingClientRect().top + window.pageYOffset;
    if (window.t213higher > containerOffsetTop) {
        window.t213higher = containerOffsetTop;
        window.t213higher_id = recId
    }
    var bodyDefBgColor = getComputedStyle(documentBody, null).backgroundColor || '';
    var timerCount = 0;
    function t213__scrollEvent() {
        if (timer) {
            window.clearTimeout(timer);
            if (timerCount >= 15) {
                t213_timer_do(container, bgColor, bodyDefBgColor, recId)
            }
            timerCount++
        }
        timer = window.setTimeout(function() {
            t213_timer_do(container, bgColor, bodyDefBgColor, recId);
            timerCount = 0
        }, 100)
    }
    window.addEventListener('scroll', t213__scrollEvent);
    t213__scrollEvent()
}
function t213_timer_do(container, bgColor, bodyDefBgColor, recId) {
    var top = container.getBoundingClientRect().top + window.pageYOffset;
    var scrollTop = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var documentBody = document.body;
    if ((scrollTop + windowHeight) >= top) {
        documentBody.style.backgroundColor = bgColor
    } else if (window.t213higher_id == recId) {
        documentBody.style.backgroundColor = bodyDefBgColor
    }
}
function t724_init(recid) {
    if (window.isMobile)
        return;
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var openerLink = rec.querySelector('.t724__opener');
    if (!openerLink)
        return;
    var cookieName = openerLink.getAttribute('data-cookie-name');
    var cookieTime = openerLink.getAttribute('data-cookie-time') * 24 * 60 * 60 * 1000;
    var cookieTimeout = parseInt(openerLink.getAttribute('data-timeout'), 10);
    var currentTimeout = isNaN(cookieTimeout) ? 0 : cookieTimeout * 1000;
    var cookieFromLS;
    try {
        cookieFromLS = localStorage.getItem(cookieName)
    } catch (error) {
        console.log('Your web browser does not support localStorage. Error status: ', error)
    }
    setTimeout(function() {
        document.addEventListener('mouseout', function(event) {
            event.stopImmediatePropagation();
            if (event.clientY > 10)
                return;
            var currentDate = Math.floor(Date.now());
            if (cookieTime <= 0) {
                cookieFromLS = sessionStorage.getItem(cookieName)
            }
            var isOpenerLinkActivated = openerLink.classList.contains('t724__opener_activated');
            if (((cookieFromLS === null || typeof cookieFromLS === 'undefined') && !isOpenerLinkActivated) || (parseInt(cookieFromLS, 10) < currentDate - cookieTime && cookieTime > 0)) {
                var clickEvent = document.createEvent('HTMLEvents');
                clickEvent.initEvent('click', !0, !1);
                openerLink.dispatchEvent(clickEvent);
                openerLink.classList.add('t724__opener_activated');
                try {
                    if (cookieTime <= 0) {
                        sessionStorage.setItem(cookieName, currentDate)
                    }
                    if (cookieTime > 0) {
                        localStorage.setItem(cookieName, currentDate)
                    }
                } catch (error) {
                    console.log('Your web browser does not support localStorage/sessionStorage. Error status: ', error)
                }
                cookieFromLS = currentDate.toString()
            }
        })
    }, currentTimeout)
}
function t390_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t390');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.style.opacity = 1;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var escapeEvent = t390_escClosePopup.bind(this, recId);
    if (popupTooltipHook) {
        var recBlocks = document.querySelectorAll('.r');
        t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
            t_popup__addAttributesForAccessibility(popupTooltipHook)
        });
        for (var i = 0; i < recBlocks.length; i++) {
            recBlocks[i].addEventListener('click', function(event) {
                var target = event.target;
                var href = target.closest('a[href="' + popupTooltipHook + '"]') ? target : !1;
                if (!href)
                    return;
                event.preventDefault();
                t390_showPopup(recId, escapeEvent);
                t_onFuncLoad('t_popup__resizePopup', function() {
                    t_popup__resizePopup(recId)
                });
                t390__lazyLoad();
                if (analitics && window.Tilda) {
                    Tilda.sendEventToStatistics(analitics, popupTooltipHook)
                }
            });
            t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
                t_popup__addClassOnTriggerButton(recBlocks[i], popupTooltipHook)
            })
        }
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t390__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        if (event.target === this)
            t390_closePopup(recId, escapeEvent)
    });
    popupCloseBtn.addEventListener('click', function() {
        t390_closePopup(recId, escapeEvent)
    });
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t390_closePopup(recId, escapeEvent);
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        document.body.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
    var curPath = window.location.pathname;
    var curFullPath = window.location.origin + curPath;
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid) {
        var selects = 'a[href^="#"]:not([href="#"]):not([href^="#price"]):not([href^="#popup"]):not([href^="#prodpopup"]):not([href^="#order"]):not([href^="#!"]),' + 'a[href^="' + curPath + '#"]:not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"]),' + 'a[href^="' + curFullPath + '#"]:not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"])';
        var selectors = rec.querySelectorAll(selects);
        for (var i = 0; i < selectors.length; i++) {
            selectors[i].addEventListener('click', function(event) {
                var hash = this.hash.trim();
                if (window.location.hash) {
                    setTimeout(function() {
                        window.location.href = hash
                    }, 50)
                }
            })
        }
    }
    function t390_escClosePopup(recId) {
        if (arguments[1].key === 'Escape')
            t390_closePopup(recId, escapeEvent)
    }
}
function t390_showPopup(recId, escapeEvent) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t390');
    if (!container)
        return;
    var windowWidth = window.innerWidth;
    var screenMin = rec.getAttribute('data-screen-min');
    var screenMax = rec.getAttribute('data-screen-max');
    if (screenMin && windowWidth < parseInt(screenMin, 10))
        return;
    if (screenMax && windowWidth > parseInt(screenMax, 10))
        return;
    var popup = rec.querySelector('.t-popup');
    var documentBody = document.body;
    t_onFuncLoad('t_popup__showPopup', function() {
        t_popup__showPopup(popup)
    });
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t390__body_popupshowed');
    document.addEventListener('keydown', escapeEvent)
}
function t390_closePopup(recId, escapeEvent) {
    var rec = document.getElementById('rec' + recId);
    var popup = rec.querySelector('.t-popup');
    var popupActive = document.querySelector('.t-popup.t-popup_show');
    if (popup === popupActive) {
        document.body.classList.remove('t-body_popupshowed');
        document.body.classList.remove('t390__body_popupshowed')
    }
    popup.classList.remove('t-popup_show');
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    document.removeEventListener('keydown', escapeEvent)
}
function t390_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    hitType: 'pageview',
                    page: virtPage,
                    title: virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t390__lazyLoad() {
    var allRecords = document.getElementById('allrecords');
    if (window.lazy === 'y' || (allRecords && allRecords.getAttribute('data-tilda-lazy') === 'yes')) {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t585_init(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var accordion = rec.querySelectorAll('.t585__accordion')[0];
    var headers = rec.querySelectorAll('.t585__header');
    var isLazy = document.getElementById('allrecords').getAttribute('data-tilda-lazy');
    var accordionScroll;
    if (accordion) {
        accordionScroll = accordion.getAttribute('data-scroll-to-expanded');
        accordion = accordion.getAttribute('data-accordion')
    } else {
        accordion = 'false';
        accordionScroll = 'false'
    }
    for (var i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', function() {
            var element = this;
            var container = element.nextElementSibling;
            var triggerButton = element.querySelector('.t585__trigger-button');
            var activeHeight = 0;
            var isAccordionDown = !1;
            if (triggerButton) {
                var isExpanded = triggerButton.getAttribute('aria-expanded') === 'true';
                triggerButton.setAttribute('aria-expanded', !isExpanded);
                container.hidden = isExpanded
            }
            if (element.classList.contains('t585__opened')) {
                element.classList.remove('t585__opened');
                t585_accordionHide(container)
            } else {
                if (accordionScroll === 'true' && accordion === 'true') {
                    activeHeight = t585__getOldAction(rec);
                    isAccordionDown = t585__getAccordionPosition(headers, element)
                }
                if (accordion === 'true')
                    t585_accordionAllHide(headers);
                element.classList.add('t585__opened');
                container.style.display = 'block';
                var height = container.scrollHeight;
                container.style.maxHeight = '0px';
                setTimeout(function() {
                    container.style.maxHeight = height + 'px';
                    if (accordionScroll === 'true') {
                        t585__calcHeight(element, container, activeHeight, isAccordionDown)
                    }
                }, 0)
            }
            if (window.lazy === 'y' || isLazy === 'yes') {
                t_onFuncLoad('t_lazyload_update', function() {
                    t_lazyload_update()
                })
            }
        })
    }
}
function t585_accordionAllHide(headers) {
    for (var i = 0; i < headers.length; i++) {
        var elementHide = headers[i];
        elementHide.classList.remove('t585__opened');
        t585_accordionHide(elementHide.nextElementSibling)
    }
}
function t585_accordionHide(container) {
    if (!container.style.maxHeight)
        container.style.maxHeight = container.scrollHeight + 'px';
    setTimeout(function() {
        container.style.maxHeight = '0px'
    }, 0)
}
function t585__getOldAction(rec) {
    var activeHeader = rec.querySelector('.t585__opened');
    var activeHeight = 0;
    if (activeHeader)
        var activeContainer = activeHeader.nextElementSibling;
    if (activeContainer)
        activeHeight = activeContainer.offsetHeight;
    return activeHeight
}
function t585__getAccordionPosition(headers, element) {
    var oldIndex;
    var newIndex;
    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        if (header.classList.contains('t585__opened'))
            oldIndex = i;
        if (header === element)
            newIndex = i
    }
    return oldIndex < newIndex ? !0 : !1
}
function t585__calcHeight(element, container, activeHeight, isAccordionDown) {
    var windowHeight = window.innerHeight;
    var windowScroll = window.scrollY;
    var containerHeight = container.scrollHeight;
    var accordionHeight = containerHeight + element.offsetHeight;
    var elementTopOffset = element.getBoundingClientRect().top + windowScroll;
    var target = isAccordionDown ? elementTopOffset - activeHeight : elementTopOffset;
    var accordionBottomLine = target + accordionHeight;
    var windowBottomLine = windowScroll + windowHeight;
    if (target < windowScroll || accordionHeight > windowHeight || accordionBottomLine > windowBottomLine) {
        t585__scroll(target)
    }
}
function t585__scroll(target) {
    var duration = 400;
    var start = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    var change = target - start;
    var currentTime = 0;
    var increment = 16;
    document.body.setAttribute('data-scrollable', 'true');
    function t585__easeInOutCubic(currentTime) {
        if ((currentTime /= duration / 2) < 1) {
            return change / 2 * currentTime * currentTime * currentTime + start
        } else {
            return change / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + start
        }
    }
    function t585__animateScroll() {
        currentTime += increment;
        window.scrollTo(0, t585__easeInOutCubic(currentTime));
        if (currentTime < duration) {
            setTimeout(t585__animateScroll, increment)
        } else {
            document.body.removeAttribute('data-scrollable')
        }
    }
    t585__animateScroll()
}
function t702_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.setAttribute('data-popup-subscribe-inited', 'y');
    rec.style.opacity = 1;
    var documentBody = document.body;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var submitHref = rec.querySelector('.t-submit[href*="#"]');
    if (popupTooltipHook) {
        var recBlocks = document.querySelectorAll('.r');
        t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
            t_popup__addAttributesForAccessibility(popupTooltipHook)
        });
        for (var i = 0; i < recBlocks.length; i++) {
            recBlocks[i].addEventListener('click', function(event) {
                var target = event.target;
                var href = target.closest('a[href$="' + popupTooltipHook + '"]') ? target : !1;
                if (!href)
                    return;
                event.preventDefault();
                t702_showPopup(recId);
                t_onFuncLoad('t_popup__resizePopup', function() {
                    t_popup__resizePopup(recId)
                });
                t702__lazyLoad();
                if (analitics && window.Tilda) {
                    Tilda.sendEventToStatistics(analitics, popupTooltipHook)
                }
            });
            t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
                t_popup__addClassOnTriggerButton(recBlocks[i], popupTooltipHook)
            })
        }
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t702__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        var windowWithoutScrollBar = window.innerWidth - 17;
        if (event.clientX > windowWithoutScrollBar)
            return;
        if (event.target === this)
            t702_closePopup(recId)
    });
    popupCloseBtn.addEventListener('click', function() {
        t702_closePopup(recId)
    });
    if (submitHref) {
        submitHref.addEventListener('click', function() {
            if (documentBody.classList.contains('t-body_scroll-locked')) {
                documentBody.classList.remove('t-body_scroll-locked')
            }
        })
    }
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t702_closePopup(recId);
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        documentBody.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
    function t702_escClosePopup(event) {
        if (event.key === 'Escape')
            t702_closePopup(recId)
    }
    popup.addEventListener('tildamodal:show' + popupTooltipHook, function() {
        document.addEventListener('keydown', t702_escClosePopup)
    });
    popup.addEventListener('tildamodal:close' + popupTooltipHook, function() {
        document.removeEventListener('keydown', t702_escClosePopup)
    })
}
function t702_lockScroll() {
    var documentBody = document.body;
    if (!documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || documentBody.parentNode || documentBody).scrollTop;
        documentBody.classList.add('t-body_scroll-locked');
        documentBody.style.top = '-' + bodyScrollTop + 'px';
        documentBody.setAttribute('data-popup-scrolltop', bodyScrollTop)
    }
}
function t702_unlockScroll() {
    var documentBody = document.body;
    if (documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = documentBody.getAttribute('data-popup-scrolltop');
        documentBody.classList.remove('t-body_scroll-locked');
        documentBody.style.top = null;
        documentBody.removeAttribute('data-popup-scrolltop');
        document.documentElement.scrollTop = parseInt(bodyScrollTop)
    }
}
function t702_showPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    var windowWidth = window.innerWidth;
    var screenMin = rec.getAttribute('data-screen-min');
    var screenMax = rec.getAttribute('data-screen-max');
    if (screenMin && windowWidth < parseInt(screenMin, 10))
        return;
    if (screenMax && windowWidth > parseInt(screenMax, 10))
        return;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var ranges = rec.querySelectorAll('.t-range');
    var documentBody = document.body;
    if (ranges.length) {
        Array.prototype.forEach.call(ranges, function(range) {
            t702__triggerEvent(range, 'popupOpened')
        })
    }
    t_onFuncLoad('t_popup__showPopup', function() {
        t_popup__showPopup(popup)
    });
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        setTimeout(function() {
            t702_lockScroll()
        }, 500)
    }
    t702__lazyLoad();
    t702__triggerEvent(popup, 'tildamodal:show' + popupTooltipHook)
}
function t702_closePopup(recId) {
    var rec = document.getElementById('rec' + recId);
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var popupAll = document.querySelectorAll('.t-popup_show:not(.t-feed__post-popup):not(.t945__popup)');
    if (popupAll.length == 1) {
        document.body.classList.remove('t-body_popupshowed')
    } else {
        var newPopup = [];
        for (var i = 0; i < popupAll.length; i++) {
            if (popupAll[i].getAttribute('data-tooltip-hook') === popupTooltipHook) {
                popupAll[i].classList.remove('t-popup_show');
                newPopup.push(popupAll[i])
            }
        }
        if (newPopup.length === popupAll.length) {
            document.body.classList.remove('t-body_popupshowed')
        }
    }
    popup.classList.remove('t-popup_show');
    document.body.classList.remove('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        t702_unlockScroll()
    }
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    t702__triggerEvent(popup, 'tildamodal:close' + popupTooltipHook)
}
function t702_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    hitType: 'pageview',
                    page: virtPage,
                    title: virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t702_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function() {
        t_forms__onSuccess(form)
    })
}
function t702__lazyLoad() {
    if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t702__triggerEvent(el, eventName) {
    var event;
    if (typeof window.CustomEvent === 'function') {
        event = new CustomEvent(eventName)
    } else if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, !0, !1)
    } else if (document.createEventObject) {
        event = document.createEventObject();
        event.eventType = eventName
    }
    event.eventName = eventName;
    if (el.dispatchEvent) {
        el.dispatchEvent(event)
    } else if (el.fireEvent) {
        el.fireEvent('on' + event.eventType, event)
    } else if (el[eventName]) {
        el[eventName]()
    } else if (el['on' + eventName]) {
        el['on' + eventName]()
    }
}
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60)
    }
}
)();
function t270_scroll(hash, offset) {
    if (!hash)
        return;
    t270_checkLoad(hash, offset);
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var wrapperBlock = document.querySelector('.t270');
    var dontChangeHistory = wrapperBlock ? Boolean(wrapperBlock.getAttribute('data-history-disabled')) : !1;
    t270_scrollToEl(hash, offset);
    if (!dontChangeHistory && isHistoryChangeAllowed) {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
        isHistoryChangeAllowed = !1
    }
    return !0
}
function t270_checkLoad(hash, offset) {
    if (window.t270_loadChecked)
        return;
    var sliderWrappers = document.body.querySelectorAll('.t-slds__items-wrapper');
    if (!sliderWrappers.length)
        return;
    var lastWrapper = sliderWrappers[sliderWrappers.length - 1];
    var sliderImgs = lastWrapper ? lastWrapper.querySelectorAll('.t-slds__bgimg') : [];
    var lastImg = sliderImgs[sliderImgs.length - 1];
    var imageUrl = lastImg ? window.getComputedStyle(lastImg).backgroundImage : '';
    imageUrl = imageUrl.substring(5, imageUrl.length - 2);
    var preloaderImg = document.createElement('img');
    preloaderImg.src = imageUrl ? imageUrl : '';
    preloaderImg.addEventListener('load', function() {
        t270_scroll(hash, offset);
        window.t270_loadChecked = !0
    })
}
function t270_scrollToEl(hash, offset) {
    if (document.body.getAttribute('data-scroll'))
        return;
    var scrollTargetY = t270_getTarget(hash, offset);
    if (!scrollTargetY)
        return;
    var html = document.querySelector('html');
    var body = document.body;
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var speed = 2000;
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
    var currentTime = 0;
    function t270_easeInQuad(pos) {
        return Math.pow(pos, 2)
    }
    function t270_animationScroll() {
        currentTime += 1 / 60;
        var newDocumentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
        if (documentHeight < newDocumentHeight) {
            documentHeight = newDocumentHeight;
            scrollTargetY = t270_getTarget(hash, offset);
            scrollY = window.scrollY || document.documentElement.scrollTop;
            time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))
        }
        var difference = currentTime / time;
        var animation = t270_easeInQuad(difference);
        if (difference < 1) {
            requestAnimationFrame(t270_animationScroll);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * animation))
        } else {
            body.removeAttribute('data-scroll');
            body.removeAttribute('data-scrollable');
            window.scrollTo(0, scrollTargetY)
        }
    }
    body.setAttribute('data-scroll', 'true');
    body.setAttribute('data-scrollable', 'true');
    t270_animationScroll()
}
function t270_getTarget(hash, offset) {
    var target;
    try {
        if (hash.substring(0, 1) === '#') {
            target = document.getElementById(hash.substring(1))
        } else {
            target = document.querySelector(hash)
        }
    } catch (event) {
        console.log('Exception t270: ' + event.message);
        return
    }
    if (!target) {
        target = document.querySelector('a[name="' + hash.substr(1) + '"]');
        if (!target)
            return
    }
    target = parseInt((target.getBoundingClientRect().top + window.pageYOffset) - offset, 10);
    target = Math.abs(target);
    return target
}
function t228__init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlock = rec.querySelector('.t228');
    var mobileMenu = rec.querySelector('.t228__mobile');
    var menuSubLinkItems = rec.querySelectorAll('.t-menusub__link-item');
    var rightBtn = rec.querySelector('.t228__right_buttons_but .t-btn');
    var mobileMenuPosition = mobileMenu ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position : '';
    var mobileMenuDisplay = mobileMenu ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display : '';
    var isFixedMobileMenu = mobileMenuPosition === 'fixed' && mobileMenuDisplay === 'block';
    var overflowEvent = document.createEvent('Event');
    var noOverflowEvent = document.createEvent('Event');
    overflowEvent.initEvent('t228_overflow', !0, !0);
    noOverflowEvent.initEvent('t228_nooverflow', !0, !0);
    if (menuBlock) {
        menuBlock.addEventListener('t228_overflow', function() {
            t228_checkOverflow(recid)
        });
        menuBlock.addEventListener('t228_nooverflow', function() {
            t228_checkNoOverflow(recid)
        })
    }
    rec.addEventListener('click', function(e) {
        var targetLink = e.target.closest('.t-menusub__target-link');
        if (targetLink && window.isMobile) {
            if (targetLink.classList.contains('t-menusub__target-link_active')) {
                if (menuBlock)
                    menuBlock.dispatchEvent(overflowEvent)
            } else {
                if (menuBlock)
                    menuBlock.dispatchEvent(noOverflowEvent)
            }
        }
        var currentLink = e.target.closest('.t-menu__link-item:not(.tooltipstered):not(.t-menusub__target-link):not(.t794__tm-link):not(.t966__tm-link):not(.t978__tm-link):not(.t978__menu-link)');
        if (currentLink && mobileMenu && isFixedMobileMenu)
            mobileMenu.click()
    });
    Array.prototype.forEach.call(menuSubLinkItems, function(linkItem) {
        linkItem.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    });
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    }
    if (menuBlock) {
        menuBlock.addEventListener('showME601a', function() {
            var menuLinks = rec.querySelectorAll('.t966__menu-link');
            Array.prototype.forEach.call(menuLinks, function(menuLink) {
                menuLink.addEventListener('click', function() {
                    if (mobileMenu && isFixedMobileMenu)
                        mobileMenu.click()
                })
            })
        })
    }
}
function t228_checkOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t228') : null;
    if (!menu)
        return;
    var mobileContainer = document.querySelector('.t228__mobile_container');
    var mobileContainerHeight = t228_getFullHeight(mobileContainer);
    var windowHeight = document.documentElement.clientHeight;
    var menuPosition = menu.style.position || window.getComputedStyle(menu).position;
    if (menuPosition === 'fixed') {
        menu.classList.add('t228__overflow');
        menu.style.setProperty('height', (windowHeight - mobileContainerHeight) + 'px', 'important')
    }
}
function t228_checkNoOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var menu = rec.querySelector('.t228');
    var menuPosition = menu ? menu.style.position || window.getComputedStyle(menu).position : '';
    if (menuPosition === 'fixed') {
        if (menu)
            menu.classList.remove('t228__overflow');
        if (menu)
            menu.style.height = 'auto'
    }
}
function t228_setWidth(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuCenterSideList = rec.querySelectorAll('.t228__centerside');
    Array.prototype.forEach.call(menuCenterSideList, function(menuCenterSide) {
        menuCenterSide.classList.remove('t228__centerside_hidden')
    });
    if (window.innerWidth <= 980)
        return;
    var menuBlocks = rec.querySelectorAll('.t228');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var maxWidth;
        var centerWidth = 0;
        var paddingWidth = 40;
        var leftSide = menu.querySelector('.t228__leftside');
        var rightSide = menu.querySelector('.t228__rightside');
        var menuList = menu.querySelector('.t228__list');
        var mainContainer = menu.querySelector('.t228__maincontainer');
        var leftContainer = menu.querySelector('.t228__leftcontainer');
        var rightContainer = menu.querySelector('.t228__rightcontainer');
        var centerContainer = menu.querySelector('.t228__centercontainer');
        var centerContainerLi = centerContainer ? centerContainer.querySelectorAll('li') : [];
        var leftContainerWidth = t228_getFullWidth(leftContainer);
        var rightContainerWidth = t228_getFullWidth(rightContainer);
        var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0;
        var dataAlign = menu.getAttribute('data-menu-items-align');
        var isDataAlignCenter = dataAlign === 'center' || dataAlign === null;
        maxWidth = leftContainerWidth >= rightContainerWidth ? leftContainerWidth : rightContainerWidth;
        maxWidth = Math.ceil(maxWidth);
        Array.prototype.forEach.call(centerContainerLi, function(li) {
            centerWidth += t228_getFullWidth(li)
        });
        if (mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) > centerWidth + 20) {
            if (isDataAlignCenter) {
                if (leftSide)
                    leftSide.style.minWidth = maxWidth + 'px';
                if (rightSide)
                    rightSide.style.minWidth = maxWidth + 'px'
            }
        } else {
            if (leftSide)
                leftSide.style.minWidth = maxWidth + '';
            if (rightSide)
                rightSide.style.minWidth = maxWidth + ''
        }
        if (menuList && menuList.classList.contains('t228__list_hidden'))
            menuList.classList.remove('t228__list_hidden')
    })
}
function t228_getFullWidth(el) {
    if (!el)
        return 0;
    var marginLeft = el.style.marginLeft || window.getComputedStyle(el).marginLeft;
    var marginRight = el.style.marginRight || window.getComputedStyle(el).marginRight;
    marginLeft = parseInt(marginLeft, 10) || 0;
    marginRight = parseInt(marginRight, 10) || 0;
    return el.offsetWidth + marginLeft + marginRight
}
function t228_getFullHeight(el) {
    if (!el)
        return 0;
    var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop;
    var marginBottom = el.style.marginBottom || window.getComputedStyle(el).marginBottom;
    marginTop = parseInt(marginTop, 10) || 0;
    marginBottom = parseInt(marginBottom, 10) || 0;
    return el.offsetHeight + marginTop + marginBottom
}
