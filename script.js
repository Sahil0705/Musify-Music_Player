const music = document.querySelector("audio");
const imag = document.querySelector("img");
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');
let duration1 = document.getElementById('duration');
let current_time = document.getElementById('current_time');

const progress_div = document.getElementById('progress_div');

const slider_div = document.getElementById('slider');
const vol_icon1 = document.getElementById('vol_icon');

let toggle = 0;
play.addEventListener("click", () =>
{
    if(toggle==0)
    {
        music.play();
        play.classList.replace('fa-play','fa-pause');
        imag.classList.add("anime");
        toggle = 1;
    }
    else
    {
        music.pause();
        play.classList.replace('fa-pause','fa-play');
        imag.classList.remove("anime");
        toggle = 0;
    }
});

const songs = 
[
    {
        name:"sahil-1",
        title:"Besabriya",
        artist:"MS Dhoni - The Untold Story",
    },
    {
        name:"sahil-4",
        title:"Bum Bum Bole",
        artist:"Taare Zameen Par"
    },
    {
        name:"sahil-2",
        title:"Padhoge Likhoge",
        artist:"MS Dhoni - The Untold Story"
    },
    {
        name:"sahil-5",
        title:"Jame Raho",
        artist:"Taare Zameen Par"
    },
    {
        name:"sahil-3",
        title:"Zindagi Zindagi",
        artist:"Duniyadari",
    },
    {
        name:"sahil-6",
        title:"Kholo kholo",
        artist:"Taare Zameen Par"
    }
]


const loadSongs = (songs) =>
{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    imag.src = `images/${songs.name}.jpg`; 
};

loadSongs(songs[0]);

songIndex = 0;

const nextSong = () =>
{
    music.pause();
    toggle = 0;
    imag.classList.remove("anime");
    play.classList.replace('fa-pause','fa-play');
    songIndex = (songIndex + 1) % + songs.length;
    loadSongs(songs[songIndex]);
    play.classList.replace('fa-play','fa-pause');
    music.play();
    toggle = 1;
    imag.classList.add("anime");
    
}

const prevSong = () =>
{
    music.pause();
    toggle = 0;
    imag.classList.remove("anime");
    play.classList.replace('fa-pause','fa-play');
    if(songIndex == 0)
    {
        songIndex = (songIndex - 1) + songs.length;
    }
    else
    {
        songIndex = songIndex - 1;
    }
    loadSongs(songs[songIndex]);
    play.classList.replace('fa-play','fa-pause');
    music.play();
    toggle = 1;
    imag.classList.add("anime");
    
}

music.addEventListener("timeupdate",(event) =>
    {
        //console.log(event);
        const {currentTime, duration} = event.srcElement;

        let progress_time = (currentTime / duration) * 100;
        progress.style.width = `${progress_time}%`;

        let min_duration = Math.floor(duration / 60);
        let sec_duration = Math.floor(duration % 60);

        let min_current = Math.floor(currentTime / 60);
        let sec_current = Math.floor(currentTime % 60);

        if(min_duration<10 && sec_duration<10)
        {
            tot_duration = `0${min_duration}:0${sec_duration}`;
        }
        else if(min_duration<10 && sec_duration>10)
        {
            tot_duration = `0${min_duration}:${sec_duration}`;
        }
        else if(min_duration>=10 && sec_duration<10)
        {
            tot_duration = `${min_duration}:0${sec_duration}`;
        }
        else{
            tot_duration = `${min_duration}:${sec_duration}`;
        }

        if(tot_duration!="NaN:NaN")
        {
            duration1.textContent = tot_duration;
        }

        tot_curr = `${min_current}:${sec_current}`;
        
        if(min_current<10 && sec_current<10)
        {
            tot_curr = `0${min_current}:0${sec_current}`;
        }
        else if(min_current<10 && sec_current>=10)
        {
            tot_curr = `0${min_current}:${sec_current}`;
        }
        else if(min_current>=10 && sec_current<10)
        {
            tot_curr = `${min_current}:0${sec_current}`;
        }
        else{
            tot_curr = `${min_current}:${sec_current}`;
        }

        if(tot_curr!="NaN:NaN")
        {
            current_time.textContent = tot_curr;
        }
    });

    progress_div.addEventListener('click',(event)=>
        {
            
            const {duration} = music;
            // console.log("offsetx : "+event.offsetX);
            // console.log("clientWidth : "+event.srcElement.clientWidth);
            const clientWid = 280;
            let move_progress = ((event.offsetX) / (clientWid)) * duration;

            music.currentTime = move_progress;
        });

music.addEventListener('ended',nextSong);

next.addEventListener('click',nextSong);

prev.addEventListener('click',prevSong);

var curr_vol = slider.value/100;
var toggle_vol;
music.volume = slider.value/100;

if(slider.value==0)
{
    toggle_vol = 1;
    vol_icon1.classList.add('fa-volume-slash');
    vol_icon1.classList.remove('fa-volume');
}
else
{
    toggle_vol = 0;
    vol_icon1.classList.add('fa-volume');
    vol_icon1.classList.remove('fa-volume-slash');
}
slider.addEventListener('change',()=>
{
    //alert(slider.value);
    music.volume = slider.value/100;
    curr_vol = music.volume;
    //alert(music.volume);
    if(slider.value==0)
    {
        toggle_vol = 1;
        vol_icon1.classList.add('fa-volume-slash');
        vol_icon1.classList.remove('fa-volume');
    }
    else
    {
        toggle_vol = 0;
        vol_icon1.classList.add('fa-volume');
        vol_icon1.classList.remove('fa-volume-slash');
    }
});


vol_icon1.addEventListener('click',()=>
{
    // alert("slider.value - "+slider.value);
    // alert("music.volume - "+music.volume);
    // alert("toggle_vol - "+toggle_vol);
    // alert("curr_vol - "+curr_vol);

    if(toggle_vol == 0)
    {
        music.volume = 0;
        slider.value = 0;
        toggle_vol = 1;
        vol_icon1.classList.add('fa-volume-slash');
        vol_icon1.classList.remove('fa-volume');
    }
    else
    {
        if(curr_vol!=0)
        {
            music.volume = curr_vol;
            slider.value = curr_vol*100;
            toggle_vol = 0;
        }
        else
        {
            music.volume = 0.1;
            slider.value = 0.1*100;
            toggle_vol = 0;
        }
        vol_icon1.classList.add('fa-volume');
        vol_icon1.classList.remove('fa-volume-slash');
    }
})