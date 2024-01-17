console.log("hello worldly peeps")

document.body.innerHTML= `
<header>
<h1>Time Harbor - Day2Day</h1>
</header>

<nav>
<ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Tasks</a></li>
    <li><a href="#">Calendar</a></li>
</ul>
</nav>

<div class="container">
    <main>
        <section class="daily-activities">
            <h2>Daily Activities</h2>
                <ul>
                <!-- Activity 1 -->
                    <li>
                        <strong>Activity:</strong> Work on Project
                        <br>
                        <strong>Time:</strong> 10:00 AM - 12:00 PM
                        <br>
                        <strong>Place:</strong> Home Office
                    </li>
                    <!-- Activity 2 -->
                    <li>
                        <strong>Activity:</strong> Exercise
                        <br>
                        <strong>Time:</strong> 5:00 PM - 6:00 PM
                        <br>
                        <strong>Place:</strong> Gym
                    </li>
                    <!-- Activity 3 -->
                    <li>
                        <strong>Activity:</strong> Read a Book
                        <br>
                        <strong>Time:</strong> 8:00 PM - 9:00 PM
                        <br>
                        <strong>Place:</strong> Living Room
                    </li>
                </ul>
        </section>
    </main>
</div>

<footer>
&copy; 2024 Time Harbor - Day2Day
</footer>     
    `