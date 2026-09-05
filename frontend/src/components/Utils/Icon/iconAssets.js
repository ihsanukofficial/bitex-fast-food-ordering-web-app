import accountCircleLine from 'remixicon/icons/User & Faces/account-circle-line.svg?raw';
import addCircleFill from 'remixicon/icons/System/add-circle-fill.svg?raw';
import addLine from 'remixicon/icons/System/add-line.svg?raw';
import alertLine from 'remixicon/icons/System/alert-line.svg?raw';
import arrowDownLine from 'remixicon/icons/Arrows/arrow-down-line.svg?raw';
import arrowDownSmallLine from 'remixicon/icons/Arrows/arrow-down-s-line.svg?raw';
import arrowLeftSmallLine from 'remixicon/icons/Arrows/arrow-left-s-line.svg?raw';
import arrowRightLine from 'remixicon/icons/Arrows/arrow-right-line.svg?raw';
import arrowRightSmallLine from 'remixicon/icons/Arrows/arrow-right-s-line.svg?raw';
import articleLine from 'remixicon/icons/Document/article-line.svg?raw';
import cameraLine from 'remixicon/icons/Media/camera-line.svg?raw';
import checkboxCircleFill from 'remixicon/icons/System/checkbox-circle-fill.svg?raw';
import checkLine from 'remixicon/icons/System/check-line.svg?raw';
import closeLine from 'remixicon/icons/System/close-line.svg?raw';
import couponLine from 'remixicon/icons/Finance/coupon-3-line.svg?raw';
import dashboardLine from 'remixicon/icons/System/dashboard-line.svg?raw';
import deleteBinLine from 'remixicon/icons/System/delete-bin-line.svg?raw';
import equalizerLine from 'remixicon/icons/Media/equalizer-2-line.svg?raw';
import facebookBoxFill from 'remixicon/icons/Logos/facebook-box-fill.svg?raw';
import fileListLine from 'remixicon/icons/Document/file-list-3-line.svg?raw';
import fireFill from 'remixicon/icons/Weather/fire-fill.svg?raw';
import fireLine from 'remixicon/icons/Weather/fire-line.svg?raw';
import groupFill from 'remixicon/icons/User & Faces/group-fill.svg?raw';
import heartFill from 'remixicon/icons/Health & Medical/heart-fill.svg?raw';
import heartLine from 'remixicon/icons/Health & Medical/heart-line.svg?raw';
import historyLine from 'remixicon/icons/System/history-line.svg?raw';
import instagramFill from 'remixicon/icons/Logos/instagram-fill.svg?raw';
import logoutBoxRLine from 'remixicon/icons/System/logout-box-r-line.svg?raw';
import mailLine from 'remixicon/icons/Business/mail-line.svg?raw';
import mapPinLine from 'remixicon/icons/Map/map-pin-line.svg?raw';
import menuLine from 'remixicon/icons/System/menu-3-line.svg?raw';
import notificationLine from 'remixicon/icons/Media/notification-3-line.svg?raw';
import pencilLine from 'remixicon/icons/Design/pencil-line.svg?raw';
import phoneLine from 'remixicon/icons/Device/phone-line.svg?raw';
import priceTagLine from 'remixicon/icons/Finance/price-tag-3-line.svg?raw';
import restaurantFill from 'remixicon/icons/Food/restaurant-2-fill.svg?raw';
import searchLine from 'remixicon/icons/System/search-line.svg?raw';
import shoppingBagLine from 'remixicon/icons/Finance/shopping-bag-3-line.svg?raw';
import shoppingBasketLine from 'remixicon/icons/Finance/shopping-basket-line.svg?raw';
import shoppingCartFill from 'remixicon/icons/Finance/shopping-cart-2-fill.svg?raw';
import shoppingCartLine from 'remixicon/icons/Finance/shopping-cart-2-line.svg?raw';
import starFill from 'remixicon/icons/System/star-fill.svg?raw';
import starLine from 'remixicon/icons/System/star-line.svg?raw';
import subtractLine from 'remixicon/icons/System/subtract-line.svg?raw';
import tiktokFill from 'remixicon/icons/Logos/tiktok-fill.svg?raw';
import timeLine from 'remixicon/icons/System/time-line.svg?raw';
import crownFill from 'remixicon/icons/Finance/vip-crown-2-fill.svg?raw';

const makeDecorative = (markup) =>
  markup.replace(
    '<svg ',
    '<svg width="1em" height="1em" aria-hidden="true" focusable="false" ',
  );

const iconAssets = Object.fromEntries(
  Object.entries({
    'ri-account-circle-line': accountCircleLine,
    'ri-add-circle-fill': addCircleFill,
    'ri-add-line': addLine,
    'ri-alert-line': alertLine,
    'ri-arrow-down-line': arrowDownLine,
    'ri-arrow-down-s-line': arrowDownSmallLine,
    'ri-arrow-left-s-line': arrowLeftSmallLine,
    'ri-arrow-right-line': arrowRightLine,
    'ri-arrow-right-s-line': arrowRightSmallLine,
    'ri-article-line': articleLine,
    'ri-camera-line': cameraLine,
    'ri-checkbox-circle-fill': checkboxCircleFill,
    'ri-check-line': checkLine,
    'ri-close-line': closeLine,
    'ri-coupon-3-line': couponLine,
    'ri-dashboard-line': dashboardLine,
    'ri-delete-bin-line': deleteBinLine,
    'ri-equalizer-2-line': equalizerLine,
    'ri-facebook-box-fill': facebookBoxFill,
    'ri-file-list-3-line': fileListLine,
    'ri-fire-fill': fireFill,
    'ri-fire-line': fireLine,
    'ri-group-fill': groupFill,
    'ri-heart-fill': heartFill,
    'ri-heart-line': heartLine,
    'ri-history-line': historyLine,
    'ri-instagram-fill': instagramFill,
    'ri-logout-box-r-line': logoutBoxRLine,
    'ri-mail-line': mailLine,
    'ri-map-pin-line': mapPinLine,
    'ri-menu-3-line': menuLine,
    'ri-notification-3-line': notificationLine,
    'ri-pencil-line': pencilLine,
    'ri-phone-line': phoneLine,
    'ri-price-tag-3-line': priceTagLine,
    'ri-restaurant-2-fill': restaurantFill,
    'ri-search-line': searchLine,
    'ri-shopping-bag-3-line': shoppingBagLine,
    'ri-shopping-basket-line': shoppingBasketLine,
    'ri-shopping-cart-2-fill': shoppingCartFill,
    'ri-shopping-cart-2-line': shoppingCartLine,
    'ri-star-fill': starFill,
    'ri-star-line': starLine,
    'ri-subtract-line': subtractLine,
    'ri-tiktok-fill': tiktokFill,
    'ri-time-line': timeLine,
    'ri-vip-crown-2-fill': crownFill,
  }).map(([name, markup]) => [name, makeDecorative(markup)]),
);

export default iconAssets;
