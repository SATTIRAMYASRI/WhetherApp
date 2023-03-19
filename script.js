const wrapper=document.querySelector(".wrapper");
const inputPart=document.querySelector(".input-part");
const infoTxt=document.querySelector(".info-txt");
const inputField=document.querySelector("input");
const locationBtn=document.querySelector("button");
const weatherIcon=document.querySelector(".weather-part img")
const arrowBack=document.querySelector("header i");
let api;

inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter" && inputField.value!="")
    {
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser not support geolocation api");
    }
});

function onError(error){
    infoTxt.textContent="error.message";
    infoTxt.classList.add("error");
}

function onSuccess(position){
    const {latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"78c17378cc918b9c1fda634dcf95bb1e"}&lang={en}`;
    fetchData(api);
}

function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"78c17378cc918b9c1fda634dcf95bb1e"}`;
    fetchData(api);
}

function fetchData(){
    infoTxt.textContent="Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result))
}

function weatherDetails(info){
    console.log(info)
    if(info.cod=="404")
    {
        infoTxt.textContent=`${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending","error");
    }
    else{
        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;

        if(id==800)
        {
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679124832/clear_trasb6.svg";
        }
        else if(id>=200 && id<=232){
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679125134/storm_zw5s44.svg";
        }
        else if(id>=600 && id<=622){
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679125123/snow_d9audh.svg";
        }
        else if(id>=701 && id<=781){
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679124898/haze_zpy83f.svg";
        }
        else if(id>=801 && id<=804){
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679124871/cloud_nc60r1.svg";
        }
        else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            weatherIcon.src="https://res.cloudinary.com/djqfb6spf/image/upload/v1679125111/rain_k7keaa.svg";
        }

        wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
        wrapper.querySelector(".weather").innerText=description;
        wrapper.querySelector(".location span").innerText=`${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText=feels_like;
        wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
       
        infoTxt.classList.remove("pending")
        wrapper.classList.add("active")
    }
}


arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove("active");
})