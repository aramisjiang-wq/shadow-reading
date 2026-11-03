(function(root){
'use strict';
const shapes={
 home:'<path d="m3 10 9-7 9 7v10H4V10M9 20v-7h6v7"/>',
 book:'<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
 words:'<path d="m3 18 5-13 5 13M5 13h6M16 9h5m-2.5-3v3c0 4-2 7-5 9m1-7c1 3 3 5 6 7"/>',
 layers:'<path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5"/>',
 review:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6M12 7v5l3 2"/>',
 chart:'<path d="M4 3v18h17M8 16v-5m5 5V7m5 9V4"/>',
 chat:'<path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9 9 0 0 1 19 0ZM7 10h9M7 14h6"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
 play:'<path d="m9 5 10 7-10 7V5Z"/>',
 volume:'<path d="M4 9h4l5-4v14l-5-4H4V9Zm12-1c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 check:'<path d="m5 12 4 4L19 6"/>'
};
function icon(name){return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${shapes[name]||shapes.book}</svg>`;}
function family(category){if(/旅行/.test(category))return'travel';if(/工作/.test(category))return'work';if(/艺术|历史/.test(category))return'culture';if(/城市/.test(category))return'city';if(/科学|科技/.test(category))return'science';if(/健康|运动/.test(category))return'wellbeing';if(/学习|思考/.test(category))return'learning';return'life';}
const art={
 life:'<path d="M26 119h128M48 119V75h82v44M44 75l45-39 45 39M81 119V91h22v28M59 86h13v15H59zM116 56V39h11v28M33 45v8m-4-4h8"/><circle cx="142" cy="31" r="10"/>',
 work:'<path d="M25 58h130v65H25zM20 123h140M73 123v15m34-15v15M56 138h68M51 58V35h79v23M46 107l24-24 23 13 35-29M115 67h13v13"/>',
 travel:'<path d="M22 124h138M38 124V61h105v63M47 61V47h85v14M51 75h79v28H51zM63 124l-9 15m65-15 9 15M44 33h90M90 20v13"/><circle cx="61" cy="113" r="3"/><circle cx="121" cy="113" r="3"/>',
 city:'<path d="M22 130h140M34 130V55h36v75M76 130V30h39v100M122 130V74h27v56M45 67h13m-13 14h13m-13 14h13M86 45h18m-18 16h18m-18 16h18m-18 16h18M89 130v-20h14v20"/>',
 culture:'<path d="M34 30h116v104H34zM43 39h98v85H43zM43 106l33-32 23 20 19-16 23 28M90 134v12m-25 0h50"/><circle cx="114" cy="61" r="10"/>',
 science:'<ellipse cx="90" cy="83" rx="66" ry="24"/><ellipse cx="90" cy="83" rx="66" ry="24" transform="rotate(60 90 83)"/><ellipse cx="90" cy="83" rx="66" ry="24" transform="rotate(120 90 83)"/><circle cx="90" cy="83" r="7"/><circle cx="149" cy="73" r="4" fill="currentColor"/>',
 wellbeing:'<path d="M87 139V88M87 115c-32 0-45-20-45-43 29 0 45 12 45 43Zm1-14c0-34 19-55 48-55 0 34-18 55-48 55ZM38 140h104"/><circle cx="45" cy="37" r="12"/>',
 learning:'<path d="M89 48c-22-14-43-14-65-6v91c22-8 43-8 65 6 22-14 43-14 65-6V42c-22-8-43-8-65 6Zm0 0v91M39 61c13-3 23-1 34 4M39 77c13-3 23-1 34 4M106 65c11-5 22-7 33-4M106 81c11-5 22-7 33-4"/>'
};
function cover(category,className=''){const name=family(category);return `<div class="ui-cover ${className}" data-cover="${name}" aria-hidden="true"><svg viewBox="0 0 180 160">${art[name]}</svg></div>`;}
root.UIAssets={icon,cover,family};
})(window);
