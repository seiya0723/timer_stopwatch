//ストップウォッチの動作チェックグローバル変数(falseで停止中)
WATCH           = false;
WATCH_RAP       = false;
WATCH_RAP_COUNT = 0;

//タイマー動作チェックグローバル変数(falseで停止中)
TIMER   = false;

window.addEventListener("load" , function (){

    $("#timer_start").on("click",function(){ timer(); });
    $("#timer_stop" ).on("click",function(){ TIMER=false });

    $("#watch_start").on("click",function(){ watch(); });
    $("#watch_stop" ).on("click",function(){ WATCH=false; });
    $("#watch_rap"  ).on("click",function(){ if (WATCH){ WATCH_RAP=true; } });

});

function timer(){


    //今のタイムスタンプを取得し、前に取得したタイムスタンプと減算。その差分だけ経過しているので更に減算して表示させる
    let old_time    = Date.now();

    //タイマーの時間を計算する
    let set_remain      = ( Number($("#timer_hour").val())*60*60 + Number($("#timer_minute").val())*60 + Number($("#timer_second").val()) )*1000; 

    //タイマーが0になるまでループする。

    function remain_calc(){

        //経過ミリ秒
        let progress    = Date.now() - old_time;
        let now_remain  = set_remain - progress;


        //残り時間表示処理(小数は切り捨て)
        let remain_hour     = ("0" + String(Math.floor(now_remain/3600000))).slice(-2);
        let remain_minute   = ("0" + String(Math.floor((now_remain%3600000)/60000))).slice(-2);
        let remain_second   = ("0" + String(Math.floor((now_remain%60000)/1000))).slice(-2);

        /*
        console.log(remain_hour  );
        console.log(remain_minute);
        console.log(remain_second);
        */

        remain_str  = remain_hour + "時間" + remain_minute + "分" + remain_second + "秒";

        $("#remain").html(remain_str);

        if (now_remain < 0){
            console.log("時間が経ちました");
            TIMER   = false;
            return true;
        }

        if (!TIMER){
            console.log("タイマーストップ");
            TIMER   = false;
            return true;
        }

        setTimeout(remain_calc, 100);
    }

    //タイマーが停止中のときだけ動かす
    if (!TIMER){
        TIMER   = true;
        remain_calc();
    }

}


function watch(){

    let old_time    = Date.now();

    function count_calc(){

        //現在時刻から過去時刻を引く
        let progress    = Date.now() - old_time;

        //残り時間表示処理(小数は切り捨て)
        let progress_hour           = ("0" + String( Math.floor(progress/3600000) )         ).slice(-2);
        let progress_minute         = ("0" + String( Math.floor((progress%3600000)/60000) ) ).slice(-2);
        let progress_second         = ("0" + String( Math.floor((progress%60000)/1000) )    ).slice(-2);
        let progress_millisecond    = ("0" + String( Math.floor((progress%1000)/10) )       ).slice(-2);

        /*
        console.log(progress_hour  );
        console.log(progress_minute);
        console.log(progress_second);
        */

        progress_str  = progress_hour + "時間" + progress_minute + "分" + progress_second + "秒" + progress_millisecond + "ミリ秒";

        $("#progress").html(progress_str);

        //ここでストップウォッチのグローバル変数を判定
        if (!WATCH){
            console.log("STOP")
            return true;
        }

        //ラップボタンがクリックされた
        if (WATCH_RAP){
            WATCH_RAP_COUNT += 1
            $("#rap_area").append("<div>ラップ:#" + String(WATCH_RAP_COUNT) + " " + progress_str + "</div>");
            WATCH_RAP   = false;
        }

        setTimeout(count_calc, 10);
    }

    if (!WATCH){
        WATCH   = true;
        count_calc();
    }
}

