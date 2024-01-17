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
                        <strong>Place:</strong> Home
                    </li>
                </ul>
        </section>

        <section class="monthly-calendar">
            <h2>Monthly Calendar</h2>
            <div class="calendar">
                    <!-- static calendar for January 2024 -->
                    <div class="day">1</div>
                    <div class="day">2</div>
                    <div class="day">3</div>
                    <div class="day">4</div>
                    <div class="day">5</div>
                    <div class="day">6</div>
                    <div class="day">7</div>
                    <div class="day">8</div>
                    <div class="day">9</div>
                    <div class="day">10</div>
                    <div class="day">11</div>
                    <div class="day">12</div>
                    <div class="day">13</div>
                    <div class="day">14</div>
                    <div class="day">15</div>
                    <div class="day">16</div>
                    <div class="day">17</div>
                    <div class="day">18</div>
                    <div class="day">19</div>
                    <div class="day">20</div>
                    <div class="day">21</div>
                    <div class="day">22</div>
                    <div class="day">23</div>
                    <div class="day">24</div>
                    <div class="day">25</div>
                    <div class="day">26</div>
                    <div class="day">27</div>
                    <div class="day">28</div>
                    <div class="day">29</div>
                    <div class="day">30</div>
                    <div class="day">31</div>
                </div>
            </section>
        </section>
    </main>
</div>

<footer>
&copy; 2024 Time Harbor - Day2Day
</footer>     
    `