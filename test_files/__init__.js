jQuery.fn.isChildAndSelfOf=function(a){return(this.closest(a).length>0)};(function(y){var C,e=20,B={},D="/j/search_tags",l="/j/search_subjects",b="/j/subject_abstract",f=$("#gaia"),p=f.find(".fliter-wp"),i=f.find(".fliter-placeholder"),q=f.find(".tag-list"),j=f.find(".sub-tag-list"),a=f.find(".list"),u=f.find(".detail-pop"),r=f.find(".more"),m=_.template($("#tag-tmpl").html()),g=_.template($("#subject-tmpl").html()),x=_.template($("#subject-info-tmpl").html()),E=0;$(window).on("scroll",function(){var F=a.height(),I=a.offset().top,H=$("body").scrollTop(),G=I-H;if(G<0&&Math.abs(G)<F&&y.fixFilter){if(!p.hasClass("fliter-fix")){i.css("height",E);p.addClass("fliter-fix").css({top:"-400px"}).animate({top:-($(".fliter-fix").outerHeight()-30)},300).find(".fliter-handle").text("当前选择："+q.find(".activate").text())}}else{i.css("height",0);p.removeClass("fliter-fix")}});f.on("click","h2 a",w).on("click",".custom-btn",d).on("click",".custom-frm button",k).on("click","label .remove",s).on("click",".more",h).on("mouseover",".cover-wp",t).on("mouseout",".cover-wp",z).on("mouseover",".detail-pop",function(){$(this).show()}).on("mouseout",".detail-pop",function(){$(this).hide()}).on("click",".fliter-fix label input",function(){var F=f.offset().top;setTimeout(function(){$("html,body").animate({scrollTop:F},500)},10)}).on("mouseover",".fliter-fix",function(F){p.animate({top:0},100)}).on("mouseout",".fliter-fix",function(F){if(!$(F.relatedTarget).isChildAndSelfOf(p)){p.animate({top:-($(this).outerHeight()-30)},100)}}).on("click","label input",function(G){var F=$(this);if(F.attr("name")==="watched"&&!F.hasClass("me")){G.preventDefault();F.removeAttr("checked");$(".login-tip").slideDown("fast");return false}else{v(F)}});function w(H){H.preventDefault();var G=$(H.target),F=G.data("type");if(F==="tv"){f.find(".custom-btn").hide()}else{f.find(".custom-btn").show()}$("#gaia_frm").find("[name=type]").val(F);G.addClass("activate");G.siblings(".activate").removeClass("activate");o({type:F})}function d(G){var F=$(G.target),H=F.siblings(".custom-frm");H.addClass("inline-block").find("input").focus();F.hide()}function k(K){K.preventDefault();var G=$(K.target),L=G.parents(".custom-frm"),J=L.find("input"),I=$.trim(J.val()),H=L.data("type");if(I){var F;tagHtml=$(m({val:I,type:L.data("type"),custom:true}));if(H==="tag"){F=tagHtml.appendTo(q)}else{if(H==="sub_tag"){F=tagHtml.appendTo(j)}}v(F.find("input"));J.val("")}L.removeClass("inline-block").siblings(".custom-btn").show()}function s(H){H.preventDefault();var G=$(H.target).parent("label"),F=G.parent().find("input:first");if(G.hasClass("activate")){v(F)}G.remove()}function v(I){var H=I.parents(".tag-list, .sub-tag-list"),G=$("#gaia_frm").find("[name=type]").val(),F=I.attr("name");$("[name=page_start]").val(0);a.empty();if(H.length){H.find(".activate").removeClass("activate").find("[checked]").removeAttr("checked");I.attr("checked","checked").parent("label").addClass("activate")}if(F==="tag"){switch(I.val()){case"最新全片":f.find("[name=sort][value=rank]").parent().show();f.find("[name=sort][value=time]").attr("checked","checked");break;case"最新":f.find("[name=sort][value=rank]").parent().show();f.find("[name=sort][value=time]").attr("checked","checked");f.find("[name=sort]").attr("disabled","disabled");break;case"豆瓣猜":f.find("[name=sort][value=rank]").parent().hide();break;default:f.find("[name=sort][value=rank]").parent().show();f.find("[name=sort]").removeAttr("disabled");if(!y.hashbang){f.find("[name=sort][value=recommend]").attr("checked","checked")}}o({type:G,tag:I.val()})}else{A()}if($.isFunction(window.render_recommend_groups)){render_recommend_groups(I.val())}}function o(F){$.get(D,F).done(function(G){if(F.tag){if(G.sub_tags){c(G.sub_tags,"sub_tag")}else{A()}}else{c(G.tags,"tag")}})}function c(J,I){var H,F,G;if(I==="tag"){q.empty()}else{if(I==="sub_tag"){j.empty();if(J){$(".sub-tags").show().find("strong").text($("[name=tag][checked]").val())}else{$(".sub-tags").hide()}}}$.each(J,function(K,L){H+=m({val:L,type:I,custom:false})});if(I==="tag"){$(H).appendTo(q);if(B.tag){F=q.find("input[value="+B.tag+"]");if(F.length){v(F)}else{F=$(m({val:B.tag,type:"tag",custom:false})).appendTo(q);v($(F).find("input"))}}else{v(q.find("input:first"))}}else{if(I==="sub_tag"){$(H).appendTo(j);if(B.sub_tag){v(j.find("input[value="+B.sub_tag+"]"))}else{v(j.find("input:first"))}}}E=p.height()}function A(F){var G=$("#gaia_frm").serialize(),H=$.get(l,G);if(y.hashbang){window.location.hash="!"+G}r.show().text("载入中...");H.done(function(I){var J=I.subjects.length;if(J||a.find(".item").length){n(I.subjects)}else{a.html("<p>未找到相关影片</p>");r.hide()}if(J>=e){r.show().text("加载更多")}else{r.hide()}if($.isFunction(F)){F()}})}function n(G,I){var F=$("[name='tag']:checked").val(),H;if(G.length){$.each(G,function(J,K){K.tag=F;H+=g(K)});$(H).appendTo(a)}else{a.html("<p>未找到相关影片</p>");r.hide()}}function h(G){var F=$(G.currentTarget),I=a.find(".item").length,H=F.offset().top-5;f.find("[name=page_start]").val(I);A(function(){setTimeout(function(){$("html,body").animate({scrollTop:H-E},500)},300)})}function t(G){if(y.is_mobile==="True"){return fasle}var F=$(G.currentTarget),I=F.data("info"),H=F.offset(),K=F.data("id"),J=F.data("isnew");clearTimeout(C);C=setTimeout(function(){u.css({display:"block",top:H.top,left:H.left+135}).empty();if(!I){$.get(b,{subject_id:K}).done(function(L){if(L.r===0){L.subject.is_new=J;L.subject.tag=$("[name='tag']:checked").val();I=L.subject;F.data("info",I);$(x(I)).appendTo(u)}})}else{$(x(I)).appendTo(u)}},600)}function z(G){var F=$(G.target);clearTimeout(C);u.css({display:"none"})}f.on("mousedown",".a_collect_btn",function(){var F=f.find("[name=watched]").hasClass("me");if(F){load_event_monitor(".detail-pop")}else{account_pop.open("login","http://movie.douban.com/?tag_search=true")}});(function(){var G=(window.location.href).split("#!")[1];var F=y.type?y.type:"movie";if(G){B=$.deparam(G);if(B.type){F=B.type}if(B.sort){f.find("[name=sort][value="+B.sort+"]").attr("checked","checked")}else{f.find("[name=sort][value=recommend]").attr("checked","checked")}if(B.watched==="on"){f.find("[name=watched]").attr("checked","checked")}if(B.playable==="on"){f.find("[name=playable]").attr("checked","checked")}}f.find("[data-type="+F+"]").trigger("click")})()})(gaiaConfig);function loadImg(b){var c=$(b),d=140/200,a=c.data("x")/c.data("y");if(a>d){c.css("height","100%")}else{c.css("width","100%")}c.fadeTo("fast",1)};