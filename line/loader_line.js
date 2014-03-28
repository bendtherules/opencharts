// document.addEventListener("load", load_em_all);

function load_em_all()
{
    load_html_css_js("html", "./line/line.html",
    {
        "points": [
            ["10%", "10%"],
            ["30%", "30%"],
            ["60%", "60%"],
            ["80%", "80%"],
            ["50%", "50%"]
        ],
        "point_radius": "10px"
    });
    load_html_css_js("css", "./line/line.css",
    {
        "points": [
            ["10%", "10%"],
            ["30%", "30%"],
            ["60%", "60%"],
            ["80%", "80%"],
            ["50%", "50%"]
        ],
        "point_radius": "10px"
    });
}

load_em_all();
console.log("Loaded stuffs");
