(function(e){var t="",n='<div class="slider-item ui-widget-content item-text" data-top="0" data-left="0" data-width="100" data-height="50" data-borderstyle="solid" data-type="text" data-title="Text" style="width: 100px; height: 50px;"><div>Text</div><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span> </div>',r='<div class="slider-item ui-widget-content item-image" data-top="0" data-left="0" data-width="80" data-height="80" data-borderstyle="solid" style="height: 80px;width: 80px;" data-type="image"><img width="100%" height="100%" src="http://files.megadrupal.com/other/image.jpg" /><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span></div>',i='<div class="slider-item ui-widget-content item-video" data-top="0" data-left="0" data-width="80" data-height="80" data-borderstyle="solid" style="height: 80px;width: 80px;" data-type="video"><img width="100%" height="100%" src="http://files.megadrupal.com/other/video.jpg" /><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span><span class="sl-video-play"></span></div>';MegaSlider.Panel=function(){this.activePanel=null;this.selectedItem=null;this.tabCounter=e("#mdf-tabs ul.mdf-tabs-head li.tab-item").size();this.toolbar=new MegaSlider.Toolbar(this);this.timeline=new MegaSlider.Timeline(this)};MegaSlider.Panel.prototype={constructor:MegaSlider.Panel,init:function(){this.initTab();this.initPanel();this.initDlgSetting();this.initSliderItem();this.toolbar.init();this.timeline.init();this.timeline.changeActivePanel();this.triggerChangeSelectItem();var t=this;e(document).keydown(function(n){var r=n.keyCode||n.which;var i=e(n.target).is("input, textarea, select");if(!i&&t.selectedItem!=null){switch(r){case 46:var s=t.selectedItem.data("timeline");if(s!=null){s.remove();t.selectedItem.remove();t.triggerChangeSelectItem()}return false;break;case 37:var o=t.selectedItem.data("left")-5;o=t.setPositionBoxLeft(t.selectedItem,o);t.toolbar.changePositionLeft(o);return false;break;case 38:var u=t.selectedItem.data("top")-5;u=t.setPositionBoxTop(t.selectedItem,u);t.toolbar.changePositionTop(u);return false;break;case 39:var o=t.selectedItem.data("left")+5;o=t.setPositionBoxLeft(t.selectedItem,o);t.toolbar.changePositionLeft(o);return false;break;case 40:var u=t.selectedItem.data("top")+5;u=t.setPositionBoxTop(t.selectedItem,u);t.toolbar.changePositionTop(u);return false;break}}});e("form input").keypress(function(e){var t=e.keyCode||e.which;if(t==13)e.preventDefault()});var n=e("#mdf-full-screen-slider-preview").mdFullScreenSlider({transitionsSpeed:800,wrapHeight:"151",wrapWidth:"291",width:291,height:151,slideShow:true,loop:true,showBullet:false,showThumb:false,posBullet:1,posThumb:1,css3bg:"#000000",showLoading:false,loadingPosition:"bottom",showArrow:false,enableDrag:true,preLoad:false});e("#navbar-content-transitions li").hoverIntent(function(){var t=e("input",this).attr("value");e("#mdf-full-screen-slider-preview .mdf-slide-item").data("transition",t);var n=e(this).position(),r=e("#mdf-setting-dlg .mdf-setting-transition").position();var i=0,s=n.left-145+e(this).width()/2;if(n.top-r.top>161)i=n.top-161;else i=n.top+2*e(this).height();e("#mdf-transition-preview").css({left:s,top:i}).show()},function(){e("#mdf-transition-preview").hide()})},initTab:function(){var n=this;t=e("#tab-template").html();e("#mdf-tabs").tabs({activate:function(t,r){e(n.activePanel).find(".slider-item.ui-selected").removeClass("ui-selected");if(e("#mdf-tabs ul.mdf-tabs-head a.active").size()>0){n.closeTabDialog()}n.activePanel=e(r.newPanel);n.timeline.changeActivePanel();n.triggerChangeSelectItem()},create:function(t,r){n.activePanel=e(r.panel)}});e("#mdf-tabs").find(".ui-tabs-nav").sortable({axis:"x",stop:function(){e("#mdf-tabs").tabs("refresh")}});e("#add_tab").click(function(){n.addTab();return false})},initPanel:function(){var t=this;e(document).on("click","#mdf-tabs ul.mdf-tabs-head .panel-settings-link",function(){var n=e(this),r=e.stringToObject(e("input.tab-setting",t.activePanel).val());if(e(this).hasClass("active")){e("#mdf-setting-dlg").slideUp();n.removeClass("active")}else{var i=e("#mdf-tabs ul.mdf-tabs-head a.active");t.setTabDialogSetting(r);if(i.size()>0){i.removeClass("active");n.addClass("active")}else{e("#mdf-setting-dlg").slideDown();n.addClass("active")}}return false});e("#mdf-tabs a.button-close").click(function(){e("#mdf-setting-dlg").slideUp(function(){e("#mdf-tabs ul.mdf-tabs-head a.active").removeClass("active")});return false});e("#mdf-slide-save").click(function(n){n.preventDefault();var r=t.getSliderData(),i={slide_data:r,action:"save"};e("#edit-save-data").val(e.objectToString(i));e("form").submit()});e("#mdf-slide-download").click(function(){var n=t.getSliderData(),r={slide_data:n,action:"download"};e("#edit-save-data").val(e.objectToString(r));e("form").submit();return false});e("#mdf-slide-preview").click(function(){var n=t.getSliderData(),r=e("input[name=sid]").val();e.post(Drupal.settings.basePath+"admin/structure/fullscreen-slider/preview",{sid:r,data:e.objectToString(n)},function(t){var n=e(".mdf-tabs-tool").offset();n.left+=.0425*e(document).width();n.top-=e(document).scrollTop();e("#fullscreen-slider-preview").empty().dialog({width:"91.5%",position:[n.left,n.top]}).html(t)});return false});e("#mdf-slide-exit").click(function(){e("#exit-dialog").dialog({resizable:false,height:200,width:300,modal:true,buttons:{Exit:function(){var t=window.location.pathname.split("/"),n="";for(var r=1;r<t.length-2;r++)n+="/"+t[r];window.location.replace(n);e(this).dialog("close")},Cancel:function(){e(this).dialog("close")}}});return false})},initDlgSetting:function(){var t=this;e("#mdf-setting-dlg .row-clone a").click(function(){t.cloneTab(t.activePanel);return false});e("#mdf-setting-dlg .row-remove a").click(function(){if(t.activePanel){if(!confirm("Are you sure want to delete this slide? After accepting this slide will be removed completely."))return;var n=e.stringToObject(e("input.tab-setting",t.activePanel).val()),r=t.activePanel.attr("id"),i=true;if(n.slideId>0){e.post(Drupal.settings.basePath+"?q=admin/structure/fullscreen-slider/delete-slide",{slide_id:n.slideId},function(e){if(e.status==0)i=false})}if(i){e("#mdf-tabs .mdf-tabs-head li[aria-controls="+r+"]").remove();e("#"+r).remove();e("#mdf-tabs").tabs("refresh");e("#mdf-tabs").tabs("option","active",0);t.closeTabDialog()}}return false});e("#mdf-setting-dlg .row-image a.btn-choose").click(function(){Drupal.media.popups.mediaBrowser(chooseBackground);return false});e("#mdf-setting-dlg .img-preview img").bind("change",function(){if(e(this).attr("src")){e(this).parent().slideDown()}else{e(this).parent().slideUp()}});e("#mdf-setting-dlg .del-img").click(function(){e(this).prev().attr("src","").trigger("change");return false});e("#mdf-setting-dlg .row-thumbnail a.btn-choose").click(function(){Drupal.media.popups.mediaBrowser(chooseThumbnail);return false});e("#mdf-setting-dlg .del-thumb").click(function(){e(this).prev().attr("src","").trigger("change")});e("#mdf-setting-dlg .row-background-color input").spectrum({clickoutFiresChange:true,showInput:true,preferredFormat:"hex6"});e("#tst-thumbnail").change(function(){if(e(this).is(":checked")){e("#mdf-setting-dlg .row-thumbnail > .row-inner").slideDown()}else{e("#mdf-setting-dlg .row-thumbnail > .row-inner").slideUp()}});e("#tst-transition").change(function(){if(e(this).is(":checked")){e("#mdf-setting-dlg .row-transition > .row-inner").slideDown()}else{e("#mdf-setting-dlg .row-transition > .row-inner").slideUp()}});e("#mdf-setting-dlg .button-apply").click(function(){var n=t.getTabDialogSetting();e("input.tab-setting",t.activePanel).val(e.objectToString(n));e(".mdf-slide-image img",t.activePanel).attr("src",n.bgImage);t.closeTabDialog();return false});e(".random-transition").click(function(){var t=Math.floor(Math.random()*5+3),n=e("ul.megaslider-3columns li").length;e("#navbar-content-transitions input").prop("checked",false);for(var r=1;r<t;r++){var i=Math.floor(Math.random()*n+1);e("#transition-"+i).prop("checked",true)}return false})},closeTabDialog:function(){e("#mdf-setting-dlg").slideUp(function(){e("#mdf-tabs ul.mdf-tabs-head a.active").removeClass("active")})},initSliderItem:function(){var t=this;e("#mdf-tabs div.slider-item").each(function(){e(this).data("slidepanel",t).triggerItemEvent();var n=e(this).getItemValues();e(this).setItemStyle(n)})},setTabDialogSetting:function(t){e("#mdf-setting-dlg input.setting-slideid").val(t.slideId?t.slideId:"");e("#mdf-setting-dlg input.setting-bgfid").val(t.bgFid?t.bgFid:"");e("#mdf-setting-dlg .row-image .img-preview img").attr("src",t.bgImage?t.bgImage:"").trigger("change");e("#mdf-setting-dlg .row-background-color input").spectrum({color:t.bgColor});e("#tst-thumbnail").prop("checked",t.customThumb).trigger("change");e("#mdf-setting-dlg .row-thumbnail .img-preview img").attr("src",t.thumb?t.thumb:"").trigger("change");e("#mdf-setting-dlg input.setting-thumbfid").val(t.thumbFid?t.thumbFid:"");e("#tst-transition").attr("checked",t.customTransitionTime).trigger("change");e("#mdf-setting-dlg .row-transition input.trans-time").val(t.transitionTime);e("#navbar-content-transitions input").prop("checked",false);if(Array.isArray(t.transitions)){e.each(t.transitions,function(t,n){e("#navbar-content-transitions input[value="+n+"]").prop("checked",true)})}},getTabDialogSetting:function(){var t=[];e("#navbar-content-transitions input:checked").each(function(){t.push(e(this).val())});return{slideId:e("#mdf-setting-dlg input.setting-slideid").val(),bgFid:e("#mdf-setting-dlg input.setting-bgfid").val(),bgImage:e("#mdf-setting-dlg .row-image img").attr("src"),bgColor:e("#mdf-setting-dlg .row-background-color input").val(),customThumb:e("#tst-thumbnail").is(":checked"),thumb:e("#mdf-setting-dlg .row-thumbnail img").attr("src"),thumbFid:e("#mdf-setting-dlg input.setting-thumbfid").val(),customTransitionTime:e("#tst-transition").is(":checked"),transitionTime:e("#mdf-setting-dlg .row-transition input.trans-time").val(),transitions:t}},triggerChangeSelectItem:function(){if(this.activePanel==null)return;var t=e(this.activePanel).find(".slider-item.ui-selected");if(t.size()==1){this.selectedItem=t}else{this.selectedItem=null}this.toolbar.changeSelectItem(this.selectedItem);this.timeline.changeSelectItem(this.selectedItem)},addTab:function(){this.tabCounter++;var n="Slide "+this.tabCounter,r="tabs-"+this.tabCounter;var i=e('<div id="'+r+'" class="tabs-panel"></div>');i.append(t).data("timelinewidth",e("#mdf-tabs").data("timelinewidth"));e("#mdf-tabs").append(i);var s=e('<li class="tab-item"><a class="tab-link" href="#'+r+'"><span class="tab-text">'+n+'</span></a><a class="panel-settings-link" href="#"></a></li>');s.appendTo("#mdf-tabs .mdf-tabs-head");var o=e("#mdf-tabs .ui-tabs-nav li").index(s);e("#mdf-tabs").tabs("refresh");e("#mdf-tabs").tabs("option","active",o)},cloneTab:function(t){var n=this;n.addTab();var r="#tabs-"+n.tabCounter;e(r).find(".mdf-slide-image").html(t.find(".mdf-slide-image").html());var i=e.stringToObject(e("input.tab-setting",t).val());i.slideId=-1;var s=t.data("timelinewidth")?t.data("timelinewidth"):e("#mdf-tabs").data("timelinewidth");e(r).data("timelinewidth",s);e(r+" input.tab-setting").val(e.objectToString(i));n.timeline.setTimelineWidth(i.transitiontime);e(".slider-item",t).each(function(){n.cloneBoxItem(e(this))})},cloneBoxItem:function(t){var s=this,o=e(t).getItemValues();if(o&&s.activePanel!=null){var u,a=o.type;if(a=="text"){u=e(n).clone()}else if(a=="image"){u=e(r).clone()}else{u=e(i).clone()}u.data("slidepanel",s).appendTo(e(".mdf-objects",s.activePanel)).triggerItemEvent();u.setItemValues(o);u.setItemStyle(o);u.setItemHtml(o);s.timeline.addTimelineItem(a,u);return true}},triggerChangeSettingItem:function(){this.toolbar.changeToolbarValue()},addBoxItem:function(t){if(this.activePanel!=null){var s;if(t=="text"){s=e(n).clone()}else if(t=="image"){s=e(r).clone()}else{s=e(i).clone()}this.timeline.addTimelineItem(t,s);s.data("slidepanel",this).appendTo(e(".mdf-objects",this.activePanel)).triggerItemEvent();this.changeSelectItem(s);this.timeline.triggerChangeOrderItem();this.toolbar.focusEdit();return true}return false},changeSelectItem:function(t){e(this.activePanel).find(".slider-item.ui-selected").removeClass("ui-selected");t.addClass("ui-selected");this.triggerChangeSelectItem()},triggerChangeSelectItem:function(){if(this.activePanel==null)return;var t=e(this.activePanel).find(".slider-item.ui-selected");if(t.size()==1){this.selectedItem=t;this.toolbar.changeSelectItem(this.selectedItem);this.timeline.changeSelectItem(this.selectedItem)}else if(t.size()==0){this.selectedItem=null;this.toolbar.changeSelectItem(this.selectedItem);this.timeline.changeSelectItem(this.selectedItem)}else{this.selectedItem=null;this.toolbar.changeSelectItem(this.selectedItem,true);this.timeline.changeSelectItem(this.selectedItem)}},getAllItemBox:function(){return e("div.slider-item",this.activePanel)},changeTimelineValue:function(){this.toolbar.changeTimelineValue()},setTimelineWidth:function(t){if(this.activePanel){e(this.activePanel).data("timelinewidth",t)}},getTimelineWidth:function(){if(this.activePanel){return e(this.activePanel).data("timelinewidth")}return null},setItemBorder:function(e,t){if(this.selectedItem!=null){if(e=="all"){this.selectedItem.data("borderAll",t);this.selectedItem.data("borderTop",t);this.selectedItem.data("borderRight",t);this.selectedItem.data("borderLeft",t);this.selectedItem.data("borderBottom",t);this.selectedItem.css({borderTop:t,borderRight:t,borderBottom:t,borderLeft:t})}else if(e=="top"){this.selectedItem.data("borderTop",t);this.selectedItem.css({borderTop:t})}else if(e=="right"){this.selectedItem.data("borderRight",t);this.selectedItem.css({borderRight:t})}else if(e=="bottom"){this.selectedItem.data("borderBottom",t);this.selectedItem.css({borderBottom:t})}else{this.selectedItem.data("borderLeft",t);this.selectedItem.css({borderLeft:t})}}},changeFontFamily:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("fontFamily",t);e(this.selectedItem).css({"font-family":'"'+t+'"'})}},setItemSize:function(e,t){this.setBoxWidth(this.selectedItem,e);this.setBoxHeight(this.selectedItem,t)},setBoxWidth:function(t,n){if(n>0){var r=e(t).parent().width()-e(t).position().left;if(n>r)n=r;e(t).width(n);e(t).data("width",n);return n}return e(t).width()},setBoxHeight:function(t,n){if(n>0){var r=e(t).parent().height()-e(t).position().top;if(n>r)n=r;e(t).height(n);e(t).data("height",n);return n}return e(t).height()},setItemAttribute:function(e,t){if(this.selectedItem!=null){switch(e){case"left":return this.setPositionBoxLeft(this.selectedItem,t);break;case"top":return this.setPositionBoxTop(this.selectedItem,t);break}}},setPositionBoxLeft:function(t,n){n=n>0?n:0;var r=e(t).parent().width()-e(t).outerWidth(true);if(n>r)n=r;e(t).css("left",n+"px");e(t).data("left",n);return n},setPositionBoxTop:function(t,n){n=n>0?n:0;var r=e(t).parent().height()-e(t).outerHeight();if(n>r)n=r;e(t).css("top",n+"px");e(t).data("top",n);return n},setItemData:function(t,n){if(this.selectedItem!=null){e(this.selectedItem).data(t,n)}},setItemCss:function(t,n){if(this.selectedItem!=null){e(this.selectedItem).data(t,n);e(this.selectedItem).css(t,n)}},setItemBackground:function(t,n){if(this.selectedItem!=null){e(this.selectedItem).data(t,n);var r=e(this.selectedItem).data("backgroundColor");if(r&&r!=""){var i=parseInt(e(this.selectedItem).data("backgroundTransparent"));var s=e.HexToRGB(r);i=i?i:100;var o="rgba("+s.r+","+s.g+","+s.b+","+i/100+")";this.selectedItem.css("backgroundColor",o)}else{this.selectedItem.css("backgroundColor","transparent")}}return false},setItemShadow:function(t,n){if(this.selectedItem!=null){e(this.selectedItem).data(t,n);var r=e(this.selectedItem).getItemValues(),i=r.shadowAngle,s=r.shadowOffset,o=r.shadowBlur,u=r.shadowColor;if(i!=null&&s!=null&&o!=null&&u!=null){var a=Math.round(s*Math.cos((i-90)/180*Math.PI)),f=Math.round(s*Math.sin((i-90)/180*Math.PI)),l=a+"px "+f+"px "+parseInt(o)+"px "+u;this.selectedItem.css("box-shadow",l)}else{this.selectedItem.css("box-shadow","none")}}return false},setPadding:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("padding",t);var n={};if(t){var r=this.selectedItem.getItemValues();if(r.paddingTop)n["padding-top"]=r.paddingTop+"px";if(r.paddingRight)n["padding-right"]=r.paddingRight+"px";if(r.paddingBottom)n["padding-bottom"]=r.paddingBottom+"px";if(r.paddingLeft)n["padding-left"]=r.paddingLeft+"px"}else{n["padding-top"]=0;n["padding-right"]=0;n["padding-bottom"]=0;n["padding-left"]=0}e(this.selectedItem).css(n)}},setItemCssPx:function(t,n){if(this.selectedItem!=null){e(this.selectedItem).data(t,n);if(t=="fontSize"||t=="lineHeight")e("div:first",this.selectedItem).css(t,n+"px");else this.selectedItem.css(t,n+"px")}},setItemFontWeight:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("fontWeight",t);t=t.toString();if(t.indexOf("italic")>0){this.selectedItem.css("fontWeight",parseInt(t));this.selectedItem.css("fontStyle","italic")}else{this.selectedItem.css("fontWeight",parseInt(t));this.selectedItem.css("fontStyle","normal")}}},alignLeftSelectedBox:function(){var t=this,n=e(this.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=1e4;n.each(function(){r=e(this).position().left<r?e(this).position().left:r});n.each(function(){t.setPositionBoxLeft(this,r)})}},alignRightSelectedBox:function(){var t=this,n=e(this.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=0;n.each(function(){var t=e(this).position().left+e(this).outerWidth();r=t>r?t:r});n.each(function(){t.setPositionBoxLeft(this,r-e(this).outerWidth())})}},alignCenterSelectedBox:function(){var t=this,n=e(t.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=n.first().position().left+n.first().outerWidth()/2;n.each(function(){t.setPositionBoxLeft(this,r-e(this).outerWidth()/2)})}},alignTopSelectedBox:function(){var t=this,n=e(t.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=1e4;n.each(function(){r=e(this).position().top<r?e(this).position().top:r});n.each(function(){t.setPositionBoxTop(this,r)})}},alignBottomSelectedBox:function(){var t=this,n=e(t.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=0,i;n.each(function(){i=e(this).position().top+e(this).outerHeight();r=i>r?i:r});n.each(function(){t.setPositionBoxTop(this,r-e(this).outerHeight())})}},alignMiddleSelectedBox:function(){var t=this,n=e(t.activePanel).find(".slider-item.ui-selected");if(n.size()>1){var r=n.first().position().top+n.first().outerHeight()/2;n.each(function(){t.setPositionBoxTop(this,r-e(this).outerHeight()/2)})}},spaceVertical:function(t){var n=this,r=e(n.activePanel).find(".slider-item.ui-selected");if(r.size()>1){t=parseInt(t);var i=r.size();for(var s=0;s<i-1;s++){for(var o=s+1;o<i;o++){if(e(r[s]).position().top>e(r[o]).position().top){var u=r[s];r[s]=r[o];r[o]=u}}}if(t>0){for(var s=1;s<i;s++){n.setPositionBoxTop(e(r[s]),e(r[s-1]).position().top+e(r[s-1]).outerHeight()+t)}}else if(i>2){var a=0;for(var s=0;s<i-1;s++){a+=e(r[s]).outerHeight()}t=(e(r[i-1]).position().top-e(r[0]).position().top-a)/(i-1);for(var s=1;s<i-1;s++){n.setPositionBoxTop(e(r[s]),e(r[s-1]).position().top+e(r[s-1]).outerHeight()+t)}}}},spaceHorizontal:function(t){var n=this,r=e(n.activePanel).find(".slider-item.ui-selected");if(r.size()>1){t=parseInt(t);var i=r.size();for(var s=0;s<i-1;s++){for(var o=s+1;o<i;o++){if(e(r[s]).position().left>e(r[o]).position().left){var u=r[s];r[s]=r[o];r[o]=u}}}if(t>0){for(var s=1;s<i;s++){n.setPositionBoxLeft(e(r[s]),e(r[s-1]).position().left+e(r[s-1]).outerWidth()+t)}}else if(i>2){var a=0;for(var s=0;s<i-1;s++){a+=e(r[s]).outerWidth()}t=(e(r[i-1]).position().left-e(r[0]).position().left-a)/(i-1);for(var s=1;s<i-1;s++){n.setPositionBoxLeft(e(r[s]),e(r[s-1]).position().left+e(r[s-1]).outerWidth()+t)}}}},setItemTitle:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("title",t);if(e(this.selectedItem).data("type")=="text")e(this.selectedItem).find("div").html(t.replace(/\n/g,"<br />"));this.timeline.changeSelectedItemTitle()}},getSliderData:function(){var t=[];e("#mdf-tabs .ui-tabs-nav a.tab-link").each(function(){var n=e(e(this).attr("href"));if(n.size()){var r=e.stringToObject(e("input.tab-setting",n).val());r.timelinewidth=n.data("timelinewidth");var i=[];e("div.slider-item",n).each(function(){i.push(e(this).getItemValues())});t.push({itemsetting:r,boxitems:i})}});return t},setItemImageSrc:function(t,n,r){var i=this;if(this.selectedItem!=null){e(this.selectedItem).data("fileid",t);e(this.selectedItem).data("title",r);e(this.selectedItem).data("thumb",n);e(this.selectedItem).find("img").attr("src",n).load(function(){var e=new Image;e.src=n;var t=e.width,r=e.height,s=i.activePanel.find(".mdf-objects").width(),o=i.activePanel.find(".mdf-objects").height();if(r>0&&o>0){if(t>s||r>o){if(t/r>s/o){i.setItemSize(s,r*s/t)}else{i.setItemSize(t*o/r,o)}}else{i.setItemSize(t,r)}i.toolbar.changeSelectItem(i.selectedItem)}});this.timeline.changeSelectedItemTitle()}},setVideoData:function(t,n,r,i){var s=this;if(this.selectedItem!=null){e(this.selectedItem).data("title",n);e(this.selectedItem).data("fileid",t);e(this.selectedItem).data("thumb",r);e(this.selectedItem).data("thumbid",i);e(this.selectedItem).find("img").attr("src",r).load(function(){var e=new Image;e.src=r;var t=e.width,n=e.height,i=s.activePanel.find(".mdf-objects").width(),o=s.activePanel.find(".mdf-objects").height();if(n>0&&o>0){if(t>i||n>o){if(t/n>i/o){s.setItemSize(i,n*i/t)}else{s.setItemSize(t*o/n,o)}}else{s.setItemSize(t,n)}s.toolbar.changeSelectItem(s.selectedItem)}});s.timeline.changeSelectedItemTitle()}},setBorder:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("border",t);var n={};if(t){var r=this.selectedItem.getItemValues();if(r.borderTop)n["borderTop"]=r.borderTop;if(r.borderRight)n["borderRight"]=r.borderRight;if(r.borderBottom)n["borderBottom"]=r.borderBottom;if(r.borderLeft)n["borderLeft"]=r.borderLeft;if(r.borderTopLeftRadius)n["border-top-left-radius"]=r.borderTopLeftRadius+"px";if(r.borderTopRightRadius)n["border-top-right-radius"]=r.borderTopRightRadius+"px";if(r.borderBottomRightRadius)n["border-bottom-right-radius"]=r.borderBottomRightRadius+"px";if(r.borderBottomLeftRadius)n["border-bottom-left-radius"]=r.borderBottomLeftRadius+"px"}else{n["borderTop"]="medium none";n["borderRight"]="medium none";n["borderBottom"]="medium none";n["borderLeft"]="medium none";n["border-top-left-radius"]=0;n["border-top-right-radius"]=0;n["border-bottom-right-radius"]=0;n["border-bottom-left-radius"]=0}e(this.selectedItem).css(n)}},setShadow:function(t){if(this.selectedItem!=null){e(this.selectedItem).data("shadow",t);var n={};if(t){var r=e(this.selectedItem).data("shadowAngle"),i=e(this.selectedItem).data("shadowOffset"),s=e(this.selectedItem).data("shadowBlur"),o=e(this.selectedItem).data("shadowColor");if(r!=null&&i!=null&&s!=null&&o!=null){var u=Math.round(i*Math.cos((r-90)/180*Math.PI)),a=Math.round(i*Math.sin((r-90)/180*Math.PI)),f=u+"px "+a+"px "+parseInt(s)+"px "+o;this.selectedItem.css("box-shadow",f)}else{this.selectedItem.css("box-shadow","none")}}else{this.selectedItem.css("box-shadow","none")}}}};chooseBackground=function(t){e("#mdf-setting-dlg .row-image .img-preview img").attr("src",t[0].url).trigger("change");e("#mdf-setting-dlg .row-image .img-preview input").val(t[0].fid)};chooseThumbnail=function(t){e("#mdf-setting-dlg .row-thumbnail .img-preview img").attr("src",t[0].url).trigger("change");e("#mdf-setting-dlg .row-thumbnail .img-preview input").val(t[0].fid)}})(jQuery)