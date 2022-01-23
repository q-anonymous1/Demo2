// set color by values in the JSON file
function set_color(aspect){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var contents = data.content;
            var sentences = document.getElementsByClassName("sentences");
            for (var i = 0; i<sentences.length; i++ ) {
                if (aspect == "aspect1"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(354, 70%, 54%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect2"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(188, 78%, 41%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect3"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(27, 98%, 54%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect4"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(64, 60%, 50%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect5"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(211, 100%, 50%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect6"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(88, 50%, 60%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect7"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(291, 47%, 60%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect8"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(134, 61%, 41%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect9"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(261, 46%, 74%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect10"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(14, 100%, 70%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect11"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(332, 79%, 58%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else if (aspect == "aspect12"){
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "hsla(162, 73%, 46%," + contents[i][aspect] + ")";
                    if (contents[i][aspect] >= 0.8){
                        sentences[i].style.color = 'white';
                    }
                }
                else{
                    sentences[i].style.color = 'black';
                    sentences[i].style.backgroundColor = "white";
                }
            }
        }
    };

    // read json file by id
    var file_url = document.getElementById("_pmid").textContent + ".txt";
    xmlhttp.open("GET", file_url, true);
    xmlhttp.send();
}


// function to add color legends
function add_color_legend(aspect){

    var color_legend = document.getElementById('color_legened');
    color_legend.style.visibility = 'visible';

    if (aspect == "aspect1"){
        color_code = "hsla(354, 70%, 54%,";
    }
    if (aspect == "aspect2"){
        color_code = "hsla(188, 78%, 41%,";
    }
    if (aspect == "aspect3"){
        color_code = "hsla(27, 98%, 54%,";
    }
    if (aspect == "aspect4"){
        color_code = "hsla(64, 60%, 50%,";
    }
    if (aspect == "aspect5"){
        color_code = "hsla(211, 100%, 50%,";
    }
    if (aspect == "aspect6"){
        color_code = "hsla(88, 50%, 60%,";
    }
    if (aspect == "aspect7"){
        color_code = "hsla(291, 47%, 60%,";
    }
    if (aspect == "aspect8"){
        color_code = "hsla(134, 61%, 41%,";
    }
    if (aspect == "aspect9"){
        color_code = "hsla(261, 46%, 74%,";
    }
    if (aspect == "aspect10"){
        color_code = "hsla(14, 100%, 70%,";
    }
    if (aspect == "aspect11"){
        color_code = "hsla(332, 79%, 58%,";
    }
    if (aspect == "aspect12"){
        color_code = "hsla(162, 73%, 46%,";
    }

    document.getElementById('legend1').style.backgroundColor = color_code + "0.2)";
    document.getElementById('legend2').style.backgroundColor = color_code + "0.4)";
    document.getElementById('legend3').style.backgroundColor = color_code + "0.6)";
    document.getElementById('legend4').style.backgroundColor = color_code + "0.8)";
}


// function to highlight sentences for explanations
function show_explanation(option) {

    // change the background color of sentences
    if (option == 'aspect1') {
        set_color("aspect1");
        add_color_legend("aspect1");
    }
    else if (option == 'aspect2') {
        set_color("aspect2");
        add_color_legend("aspect2");
    }
    else if (option == 'aspect3') {
        set_color("aspect3");
        add_color_legend("aspect3");
    }
    else if (option == 'aspect4') {
        set_color("aspect4");
        add_color_legend("aspect4");
    }
    else if (option == 'aspect5') {
        set_color("aspect5");
        add_color_legend("aspect5");
    }
    else if (option == 'aspect6') {
        set_color("aspect6");
        add_color_legend("aspect6");
    }
    else if (option == 'aspect7') {
        set_color("aspect7");
        add_color_legend("aspect7");
    }
    else if (option == 'aspect8') {
        set_color("aspect8");
        add_color_legend("aspect8");
    }
    else if (option == 'aspect9') {
        set_color("aspect9");
        add_color_legend("aspect9");
    }
    else if (option == 'aspect10') {
        set_color("aspect10");
        add_color_legend("aspect10");
    }
    else if (option == 'aspect11') {
        set_color("aspect11");
        add_color_legend("aspect11");
    }
    else if (option == 'aspect12') {
        set_color("aspect12");
        add_color_legend("aspect12");
    }
    else{
        set_color("reset");
        document.getElementById('color_legened').style.visibility = 'hidden';
    }
}