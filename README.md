# MyComparator
Initialisation.
HTML Stucture:

        <div class="mygalery"></div>
        <script type="text/javascript" src="./comparator.js"></script>

In js file create a two dimensional array. mark the addresses of full-size images in the first array, and the addresses of their thumbnails in the second array:
        
        var mass = [["./img/full/black_hole_on_earth-wallpaper-1920x1080.jpg",
        "./img/full/dark_earth-wallpaper-1920x1080.jpg",
        "./img/full/cuba_and_bahamas_islands_seen_from_space-wallpaper-1920x1080.jpg",
        "./img/full/high_tech_earth-wallpaper-1920x1080.jpg"
    ],
        ["./img/thumbs/black_hole_on_earth-wallpaper-thumb.jpg",
        "./img/thumbs/dark_earth-wallpaper-thumb.jpg",
        "./img/thumbs/cuba_and_bahamas_islands_seen_from_space-wallpaper-thumb.jpg",
        "./img/thumbs/high_tech_earth-wallpaper-thumb.jpg"
    ]]
    
call the intial function
        
        startCompare(mass);
