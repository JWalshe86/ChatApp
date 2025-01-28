
After completing several Udemy courses on C# rather than do more I felt it was time to build projects. I aimed to try and understand everything in this Application and put it into my own words here. Rather than build it once and move onto another project, which is what I usually do, I built the app again and again . Each time I restarted making the App I found more things I didn’t know. This made me think, with regards to learning, doing the same project over and over until I understand it fully might be more effective. 
I asked ChatGPT for a project idea to enhance my C# skills, it suggested creating a ChatApp. This is a website where users can post messages and view messages from others in real-time. It reminded me of the early online chat rooms from 20 years ago.
The app leverages a package called SignalR, which enables real-time communication. SignalR also incorporates asynchronous programming, ensuring the application remains responsive while processing sent messages.
There were many challenges along the way, I spent hours debugging only to realise all POST forms need an anti-forgery token. Also I spent ages learning about implementing AppDbContext only to realise it wasn’t necessary for my current set up.
This marks the first stage of the app, and I plan to expand its features over time. Through this project, I’ve gained valuable experience with:
ASP.NET Core for building web applications.
SignalR for real-time messaging.
Setting up authentication and authorization systems.
Structuring applications within Program.cs.
Managing databases using Entity Framework Core.



SECTION 1: BUILDING PROJECT
Project Template
In Visual Studio I created a new project named ChatApp using ‘ASP.NET Core Web App (Razor Pages).
Package Setup

To enable users to register and log in on each visit, I needed a way to persist their information between sessions. For this purpose, I installed SQLite as the database. To manage the login functionality, I integrated ASP.NET Core Identity, which provides built-in support for user authentication and authorization. Finally, to ensure users could see messages sent by others in real-time, I incorporated SignalR, a library for enabling real-time communication in web applications.

Adding the Packages
Navigate to the Directory with the .csproj File: For me it was :
PS C:\Users\johnwalshe\source\repos\ChatApp\ChatApp>

As I was using .NET 8  I had to ensure my packages were compatible:
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
dotnet add package Microsoft.AspNetCore.SignalR
I could then check if the packages had been installed:
Dotnet list package
Outcome 1: Added Dependencies.

Containing & Injecting Services
Once the necessary packages were installed, I needed to integrate them into the project. ASP.NET Core simplifies this process with its built-in Dependency Injection (DI) framework, which manages services and their usage throughout the application.
It includes a class called WebApplicationBuilder, which serves as the starting point for configuring and building a web application. Using this class, I was able to create a builder instance where the added packages could be saved in its Services property.
The Services property is a collection that acts as a central container for managing and providing services across the application. It ensures that services are registered once and can be reused wherever needed without manual instantiation.
This meant if a certain part of the application needed a service such as Identity or SignalR, they could be taken from this Services property and injected wherever necessary.
Once all the necessary services were registered, builder.Build() would create the actual application instance. This application instance serves as the runtime environment, where I could further configure middleware and define the application's behavior before running it.
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args); 
// This is where services will be added, like SignalR, Entity Framework, etc.
      var app = builder.Build();   
        // Once the app is built, you can run it and define routing, middleware, etc.
        app.Run();
    }
}


Connecting the Database
The appsettings.json file serves as a centralized configuration file in .NET projects. One of its primary roles is to define settings for database connections in a dedicated ConnectionStrings section. 
For example, in this project, the DefaultConnection key specifies the connection details for the SQLite database file ChatApp.db. This connection string is then passed to Entity Framework Core (EF Core) to establish a link to the database.





A DbContext is a fundamental class in EF Core that acts as the bridge between your application and the database, leveraging the connection string defined in appsettings.json. It manages the database connection, tracks changes to your data, and performs CRUD operations. Think of it as the gateway enabling your application to interact with the database using object-oriented code.
Two key methods are critical for configuring the DbContext and database interactions in your application. 1. AddDbContext registers the DbContext as a service, ensuring dependency injection (DI) can provide it with the necessary settings, such as connection strings. 2. Meanwhile, AddEntityFrameworkStores configures Identity to use the DbContext for its core services, like authentication and user management, while enabling migrations for Identity tables.
In this app, AddEntityFrameworkStores takes the IdentityDbContext class, which defines the structure for Identity-related tables, such as AspNetUsers. EF Core uses this class when you run migrations (dotnet ef migrations) to update the database structure.

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            builder.Services.AddDbContext<IdentityDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly("ChatApp")));  // Ensure you're pointing to the correct migration assembly.

            // Add Identity services
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddDefaultTokenProviders();

            // Add authentication and authorization middleware
            builder.Services.AddAuthentication()
                .AddCookie();

            builder.Services.AddAuthorization();

            // Add logging configuration here
            builder.Logging.ClearProviders(); // Clear default providers (optional) builder.Logging.AddConsole(); // Add Console logging builder.Logging.AddDebug(); // Add Debug logging builder.Logging.AddEventSourceLogger(); // Add EventSource logger(optional)

            var app = builder.Build();
            // Use authentication and authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();
            // Explicitly map /Chat to the Chat.cshtml page inside the Pages/Chat folder 
            app.MapFallbackToPage("/Chat", "/Chat/Chat");
            app.Run();
        }
    }

}


Migrations and Identity Services

Now that your database is linked to the project, EF Core can be used to interact with the database, pushing and pulling data as needed, while also managing the structure and updates of the database:
 dotnet ef migrations add InitialCreate

When you run dotnet ef migrations here for the first time, EF Core uses IdentityDbContext class to figure out how the Identity tables should be structured. Since the database is originally empty, EF Core compares the model (the IdentityDbContext) with the current state of the database and generates a migration that creates the necessary tables. 

Before updating the database check your migration folder to see if the table migrated correctly. It should look like this:

dotnet ef database update

This command applies the migration to your database. It will create the database if it doesn’t exist and update it to reflect the current state of your models.
Image 2: New created database file. 

After running the update db command, Entity Framework Core generates a new SQLite database file, ChatApp.db, in your project directory. This file is used to store data like user information. The database file will be created if it doesn't already exist.
To view the tables I installed an SQLite extension for visual studio. 

Image 3: Visual Studio Extension SQLite and SQL Server Compact Toolbox.
Adding Connection from SQLite Tool to Database.
I went to Tools and selected the Toolbox. I then right clicked on ‘connections’ and clicked ‘Add SQLite Connection’. Next I used ‘Browse..’ to find my ChatApp.db and connect to it.
Image 4: Add SQLite connection.



I could now see my migrated tables in the Toolbox.


Recap
Once the database is linked to your project, you can generate the necessary Identity tables by running dotnet ef migrations add InitialCreate, which compares your IdentityDbContext with the empty database and creates a migration. After verifying the migration in the folder, you apply it using dotnet ef database update, creating the SQLite database (ChatApp.db) and updating its schema. To view the tables, you can use the SQLite extension in Visual Studio, connecting to the database by selecting Tools > SQL Server Compact and SQLite Toolbox and adding an SQLite connection to view the migrated tables.

SECTION 2: RUNNING PROJECT

Setting up middleware is one of the first steps in configuring authentication and authorization. The middleware pipeline ensures that authentication and authorization are properly handled for each incoming request before routing the request to specific components like SignalR or Razor Pages. This configuration sets up the authentication and authorization middleware (app.UseAuthentication() and app.UseAuthorization()) and maps the SignalR hub for real-time communication. This ensures that only authenticated and authorized users can interact with the chat functionality.
To configure middleware for authentication, add the following code after var app = builder.Build():
var app = builder.Build();
// Set up middleware pipeline
app.UseRouting(); //Must come before UseAuthentication/Authorization
app.UseStaticFiles(); 
app.UseAuthentication();
app.UseAuthorization();
app.Run();

The app.UseRouting(); middleware must come before app.UseAuthentication(); and app.UseAuthorization(); in the middleware pipeline. This is because UseRouting establishes the routing system, which is essential for determining how requests are mapped to specific endpoints like Razor Pages. Middleware such as authentication and authorization relies on the route data set up by UseRouting to enforce security policies tied to particular endpoints.
In applications using Razor Pages, UseRouting is particularly crucial because it enables the framework to map incoming requests to the corresponding .cshtml files in the Pages folder. Without it, requests like /Chat or /Index cannot be matched to their intended routes, resulting in errors such as "404 Not Found".




Now the database is connected with the correct tables and middleware is in place; Authentication and authorization should be set up before messaging to ensure only authenticated users can access chat functionality and messages are properly associated with users. Once in place, you can configure SignalR's ChatHub to ensure secure messaging and role-based access to chat rooms, using user identity for message handling.




Starting with authentication, the next logical step is to implement the Razor Pages for registration, login and logout. This ensures users can interact with the identity system through a user-friendly interface.

Razor Pages in this ChatApp help structure the user interface using server-side rendering. Each page consists of an HTML .cshtml file and a C# code file for logic. They can be used for the home page, chat room, login, and registration pages. Razor Pages work well with real-time features like SignalR, enabling dynamic, backend-driven pages for user interaction while keeping frontend and backend logic separate.
Add Razor Pages Service.
To ensure that your application is properly set up to handle HTTP requests and dynamic pages. Adding the Razor Pages service (via builder.Services.AddRazorPages()) is necessary if you intend to serve dynamic pages in your app, such as the registration page. Razor Pages provide the framework to generate HTML dynamically using Razor syntax, and it's responsible for routing requests to the appropriate pages.
To use Razor page, you'll need to add builder.Services.AddRazorPages() to ensure proper routing and page handling.
public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add Entity Framework Core with SQLite for AppDbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                //other services

            // Add Razor Pages support
            builder.Services.AddRazorPages();

            var app = builder.Build();
            app.UseRouting(); // Must come before mapping razor pages
            // Enable Razor Pages routing
            app.MapRazorPages();

            // Run the application
            app.Run();
        }


With Razor properly configured in the Main method you can now create  the actual Authentication Razor Pages in Pages/Account Folder.  Razor Pages are added by creating .cshtml files inside a Pages/Account folder. 







Create a new Razor Page called Register.cshtml in a Pages/Account folder.

@page
@model RegisterModel

<h2>Register</h2>

<p>Model test: @Model?.Username</p> <!-- This should render blank initially -->


<form method="post" action="/Account/Register">
    @Html.AntiForgeryToken()
    <div class="form-group">
        <label for="Username">Username</label>
        <input type="text" name="Username" class="form-control" asp-for="Username" />
   </div>
    <div class="form-group">
        <label for="Email">Email</label>
        <input type="email" name="Email" class="form-control" asp-for="Email" />
    </div>
    <div class="form-group">
        <label for="Password">Password</label>
        <input type="password" name="Password" class="form-control" asp-for="Password" />
    </div>
    <div class="form-group">
        <label for="ConfirmPassword">Confirm Password</label>
        <input type="password" name="ConfirmPassword" class="form-control" asp-for="ConfirmPassword" />
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>

@if (!string.IsNullOrEmpty(Model.ErrorMessage))
{
    <div class="alert alert-danger">
        @Model.ErrorMessage
    </div>
}


The code above here defines the Razor Page for user registration. It contains an HTML form with fields for entering a username, email, password, and password confirmation. If there is an error message (e.g., invalid input or registration failure), it is displayed below the form in a red alert box. The @model RegisterModel directive binds the page to a C# model (will create next) that handles the logic for processing the registration, and the form’s action is determined by the post method.
The asp-for tag helper ensures that form inputs are correctly linked to the properties in your model, allowing ASP.NET Core to handle data binding and validation automatically. 

Form input is turned into instances of the Register class
The Razor Page is responsible for rendering the UI and managing user interactions, while the Page Model handles data processing, validation, and communication with services or the database.
When a form is submitted on a Razor Page, it sends a POST request to the same page URL by default. This triggers a corresponding method in the page’s Page Model (like OnPostAsync) to handle the request. 



If you set an action attribute on the form, the request goes to the specified URL instead, and the handler method in the model might need to be adjusted accordingly (e.g., renaming to OnPost<action>Async).
Consider the RegisterModel class that will be used to handle user registration. The OnPostAsync() method is the handler for the POST request triggered when the user submits the registration form on the Razor Page. It is responsible for creating a new IdentityUser object when the registration process is successful. It uses the UserManager<IdentityUser> service to handle the creation of the user in the underlying identity system, ensuring that the user is properly registered in the database. If the registration is successful, the method redirects to the Index page and stores a success message in TempData. If not, it displays the relevant error messages on the same page.
This setup demonstrates how Razor Pages delegate UI responsibilities to the Razor view, while the model handles business logic, data binding, and validation. This clear division helps keep the code maintainable and modular, adhering to ASP.NET Core’s best practices.
I’ve also added detailed logs showing the injection of the UserManager<IdentityUser> service, along with their details.
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

public class RegisterModel : PageModel
{
    private readonly UserManager<IdentityUser> _userManager;

    public RegisterModel(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;

        // Log when the RegisterModel is created
        Console.WriteLine("RegisterModel has been created.");

        // Log actual object details of UserManager<IdentityUser>
        if (_userManager != null)
        {
            Console.WriteLine("UserManager<IdentityUser> injected.");
            Console.WriteLine("UserManager<IdentityUser> type: " + _userManager.GetType().FullName);
        }
        else
        {
            Console.WriteLine("UserManager<IdentityUser> is null.");
        }
    }

    [BindProperty]
    public string Username { get; set; }
    [BindProperty]
    public string Email { get; set; }
    [BindProperty]
    public string Password { get; set; }
    [BindProperty]
    public string ConfirmPassword { get; set; }

    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (Password != ConfirmPassword)
        {
            ErrorMessage = "Passwords do not match.";
            return Page();
        }

        var user = new IdentityUser { UserName = Username, Email = Email };
        var result = await _userManager.CreateAsync(user, Password);

        if (result.Succeeded)
        {
            // Store the success message in TempData
            TempData["SuccessMessage"] = $"{Username} successfully registered";

            // Redirect to the Index page
            return RedirectToPage("/Index");
        }

        foreach (var error in result.Errors)
        {
            ErrorMessage += error.Description + "<br />"; 
        }

        return Page();
    }
}


In the above, the injected UserManager<IdentityUser> instance provides the CreateAsync method, which is used to create and save the IdentityUser object. This method takes the IdentityUser object (representing the new user) and their password as inputs. Internally, the UserManager handles the password hashing, validates the user data, and saves the user’s information in the database using the Identity system. In simpler terms, this process ensures that the new user is not only created in the system but also that their data is stored in the database for future use.


(To improve UI) Add these alerts for success authorisations into Index.cshtml

@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";

    // Extract login, logout, and success messages from TempData
    var loginMessage = TempData["LoginMessage"] as string;
    var logoutMessage = TempData["LogoutMessage"] as string;
    var successMessage = TempData["SuccessMessage"] as string;
}

<!-- Display message alerts if they exist -->
@foreach (var message in new[] { successMessage, loginMessage, logoutMessage })
{
    if (!string.IsNullOrEmpty(message))
    {
        <div class="alert alert-success">
            @message
        </div>
    }
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://learn.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
</div>


Testing the registration process.

I ran the app and put /Account/Register into the url.
The logs below indicate that the RegisterModel class was successfully created and that the UserManager<IdentityUser> service was injected into it. Thus, when the form was submitted, the OnPostAsync method used UserManager<IdentityUser> to process the registration and store the user in the database.




After registering a new user, the data is stored in the AspNetUser table in the ChatApp.db. This means the registration process is working as expected. The inputs from your registration form are being successfully bound to your RegisterModel properties, validated, and then passed to the UserManager to create a new user. Once the user is created, the data is stored in the AspNetUsers table by Identity's built-in functionality. This shows that model binding is correctly capturing data from the form fields, validation (such as checking password confirmation) is being applied before user creation, the UserManager service is successfully adding the user to your database, and the DbContext and Identity setup in your Program.cs are properly configured to interact with the database.

Image 10: Database AspNetUsers Table updating with registry inputs.

Login
This newly registered user can be used to log into the app, using the PasswordSignInAsync() which we’ll see soon. 
But firstly, this Razor Page markup represents a login form where users can enter their username and password. The form uses a POST method to submit the data. It includes fields for the username and password, both of which are required. If there is an error message (such as invalid credentials), it will be displayed in a red alert box. The LoginModel class handles the logic behind processing the login attempt like the PasswordSignInAsync() method.
This also goes into the Account folder. 
@page
@model LoginModel


<h2>Login</h2>

<form method="post">
    @Html.AntiForgeryToken() @* Don't forget this line! *@
    <div class="form-group">
        <label for="Username">Username</label>
        <input type="text" class="form-control" id="Username" name="Username" required />
    </div>
    <div class="form-group">
        <label for="Password">Password</label>
        <input type="password" class="form-control" id="Password" name="Password" required />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
</form>



@if (Model.ErrorMessage != null)
{
    <div class="alert alert-danger mt-2">
        @Model.ErrorMessage
    </div>
}


Login Model
After creating the Login.cshtml page, the LoginModel is now essential for handling the logic behind the page. This model ties the front-end (Razor Page) to the backend authentication process, enabling users to securely log in with their credentials.
PageModel Inheritance: LoginModel inherits from PageModel, which helps handle the logic for Razor Pages, such as the OnPostAsync method. This allows interaction between the page (e.g., Login.cshtml) and the backend logic.
Dependency Injection of SignInManager: The SignInManager<IdentityUser> handles user authentication tasks like login. It’s injected into the LoginModel via Dependency Injection, meaning ASP.NET Core provides this service automatically.
Binding Properties: The [BindProperty] attributes link the Username and Password properties in the LoginModel to the input fields on the Razor Page. When the form is submitted, these properties automatically get the values entered by the user.
OnPostAsync() Method: This method runs when the form is submitted. It uses PasswordSignInAsync to authenticate the user. If successful, the user is redirected to the /Index page with a success message. If the login fails, an error message is displayed on the same page.
PasswordSignInAsync: This method checks the username and password by searching the database and comparing the entered password with the stored hash. If they match, the user is authenticated.


Chat Model with Added Logs for testing.
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Threading.Tasks;


namespace ChatApp.Pages.Account
{

public class LoginModel : PageModel
{
    private readonly SignInManager<IdentityUser> _signInManager;

    public LoginModel(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;

        // Log when the LoginModel is created
        Console.WriteLine("LoginModel has been created.");

        // Log actual object details of SignInManager<IdentityUser>
        if (_signInManager != null)
        {
            Console.WriteLine("SignInManager<IdentityUser> injected.");
            Console.WriteLine("SignInManager<IdentityUser> type: " + _signInManager.GetType().FullName);
        }
        else
        {
            Console.WriteLine("SignInManager<IdentityUser> is null.");
        }
    }

    [BindProperty]
    public string Username { get; set; }
    [BindProperty]
    public string Password { get; set; }

    public string ErrorMessage { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        // Log when the OnPostAsync method starts execution
        Console.WriteLine("OnPostAsync invoked in LoginModel.");

        // Log the input Username
        Console.WriteLine("Login attempt for Username: " + Username);

        var result = await _signInManager.PasswordSignInAsync(Username, Password, false, false);

        if (result.Succeeded)
        {
            // Log successful login
            Console.WriteLine($"User '{Username}' successfully logged in.");

            // Store success message in TempData
            TempData["LoginMessage"] = $"{Username} has successfully logged in.";

            // Redirect to Chat page
            Console.WriteLine($"Redirecting '{Username}' to the Chat page.");
            return Redirect("/Index");
        }

        // Log failure details
        Console.WriteLine($"Login failed for Username: {Username}. Invalid credentials.");

        // Set error message
        ErrorMessage = "Invalid login attempt.";

        // Log that the user will stay on the login page
        Console.WriteLine($"Returning to Login page with error message for Username: {Username}.");
        return Page();
    }
}
}


Login Testing
The logs below show the creation and initialization of the LoginModel class, including the injection of the SignInManager<IdentityUser> dependency. The log confirms that the SignInManager<IdentityUser> has been successfully injected into the model, and it provides the fully qualified type of the SignInManager. Additionally, the logs indicate that the OnPostAsync method of the LoginModel has been invoked, signaling the start of the login process. The final log entry shows that a login attempt was made for the user with the username "johnwalshe." This logging information provides visibility into the model's lifecycle and the actions being taken during the login process.




Outcome 5: Log in/out with Registered User



Logout Page.

@page
@model LogoutModel

<h2>Logging out...</h2>

<p>You are being logged out. Redirecting...</p>


How Logging out works here
ASP.NET Core's DI system recognizes that SignInManager<IdentityUser> has been registered as a service by the builder.Services.AddIdentity<IdentityUser, IdentityRole>() call. When a LogoutModel is instantiated, the DI system automatically injects an instance of SignInManager<IdentityUser> into the model.
When a user logs out via a GET request, the OnGetAsync() method in the LogoutModel is invoked. This method uses the injected SignInManager<IdentityUser>'s SignOutAsync() method to log the user out by invalidating their authentication cookies. After signing out, a success message is stored in TempData, and the user is redirected to the Index page.
For better adherence to HTTP standards, it's recommended to use a POST request for logout actions instead of GET but for now I’m using a GET request. 

I added TempData to the Logout Model to create a logged out message upon logging out. I also added extra debugging. 

Logout Model.

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Threading.Tasks;

public class LogoutModel : PageModel
{
    private readonly SignInManager<IdentityUser> _signInManager;

    public LogoutModel(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;

        // Log when the LogoutModel is created
        Console.WriteLine("LogoutModel has been created.");

        // Log actual object details of SignInManager<IdentityUser>
        if (_signInManager != null)
        {
            Console.WriteLine("SignInManager<IdentityUser> injected.");
            Console.WriteLine("SignInManager<IdentityUser> type: " + _signInManager.GetType().FullName);
        }
        else
        {
            Console.WriteLine("SignInManager<IdentityUser> is null.");
        }
    }

    public async Task<IActionResult> OnGetAsync()
    {
        // Log when OnGetAsync method is invoked
        Console.WriteLine("OnGetAsync invoked in LogoutModel.");

        // Sign out the user
        Console.WriteLine("Attempting to sign out the user.");
        await _signInManager.SignOutAsync();

        // Log that the user has been signed out successfully
        Console.WriteLine("User successfully signed out.");

        // Store a success message in TempData
        TempData["SuccessMessage"] = "You have been logged out successfully.";
        Console.WriteLine("Logout success message stored in TempData.");

        // Log redirection after successful logout
        Console.WriteLine("Redirecting to the Index page after logout.");
        
        // Redirect to the homepage or another page after logout
        return RedirectToPage("/Index");
    }
}


Dependency Injection of SignInManager<IdentityUser>
In the constructor of LogoutModel, SignInManager<IdentityUser> is passed as a parameter: LogoutModel(SignInManager<IdentityUser> signInManager).
ASP.NET Core’s DI system recognizes that SignInManager<IdentityUser> has been registered as a service (as part of Identity configuration in Program.cs), and automatically provides an instance of it when creating the LogoutModel class.
Logout Testing
In the LogoutModel constructor, we log the successful creation of the model and the injection of SignInManager<IdentityUser>. This logging helps us ensure that the dependencies are correctly set up. When the OnGetAsync method is invoked, we log each step to trace the user’s sign-out process and confirm that the SignInManager successfully signed out the user. Finally, we store a logout success message in TempData and redirect the user back to the homepage.

After logging in I inserted the following url: Account/Logout
I then got the following:





Section 2 Recap
The Register Page allows users to create an account by providing a username, email, and password. Upon submission, the RegisterModel class uses UserManager<IdentityUser> to create a new user in the database. It validates the password confirmation and stores a success message in TempData. After registration, users are redirected to the homepage, and the user data is saved in the AspNetUsers table.
The Login Page allows users to authenticate with their username and password. The LoginModel uses SignInManager<IdentityUser> to authenticate users via PasswordSignInAsync(). On success, the user is redirected to the homepage, and a success message is stored in TempData. If authentication fails, an error message is displayed.
The Logout Page logs the user out using SignOutAsync() from SignInManager<IdentityUser>. After successful logout, a success message is stored in TempData and the user is redirected to the homepage.
In all cases, TempData is used to display success or error messages on the UI. Logging has been added at key points to track actions such as user registration, login, and logout, ensuring smooth operation and easier debugging.







SECTION 3: SignalR Integration


After setting up the database and authentication system, the next step in building real-time messaging functionality is to create a ChatHub using SignalR. A Hub in SignalR acts as the central communication hub between the server and connected clients, facilitating real-time interaction. In a chat application, the ChatHub enables users to send and receive messages instantly, eliminating the need to refresh the page.
When a user sends a message, it is immediately broadcast to all other connected clients through the hub. Additionally, the ChatHub provides flexibility, allowing messages to be sent to all clients, specific groups (e.g., chat rooms), or individual users. 
In the ChatHub class, the SendMessage method is used to send messages from one client to all other connected clients. The Clients.All.SendAsync function is used to broadcast the message to everyone listening to the 'ReceiveMessage' event. This is what enables real-time communication, as all clients connected to the hub will instantly see the message.
In Program.cs, SignalR is configured by registering it with builder.Services.AddSignalR() and mapping the ChatHub to a specific route, allowing clients to connect to it. The client-side JavaScript connects to the ChatHub endpoint /chathub and 
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}

listens for the ReceiveMessage event.
Put ChatHub.cs into a folder named Hubs. 

Ensure to have the SignalR service added to the Program class:


builder.Services.AddSignalR();


 // Also this Mapping in middleware:

app.MapHub<ChatHub>("/chatHub");

The line app.MapHub<ChatHub>("/chatHub"); maps the SignalR Hub to a specific endpoint, allowing clients to connect and communicate with the server in real-time. The ChatHub class handles the communication logic between the server and the clients, providing methods that clients can call and allowing the server to push updates to clients. 

Setting Up the Chat with SignalR

After creating the ChatHub class for handling real-time messaging, we can now set up the front-end interface where clients can interact with the messaging service. This involves creating a Razor Page called Chat.cshtml in a Pages/Chat folder and a corresponding ChatModel to handle its logic.
The Chat.cshtml page provides the structure and interface where users can send and receive messages in real-time using SignalR. Below is a breakdown of how this page and the SignalR connection work together:
Declaring the Razor Page
In the Chat.cshtml Razor Page, the page declares itself using @page and links to its C# model, ChatModel, via @model. This model manages the data and logic for the page. Messages are displayed by looping through Model.Messages inside the ul element. Users can enter their name in the userInput field and a message in the messageInput field to participate in the chat.
SignalR Setup and Message Handling

Real-time communication is enabled through SignalR. The SignalR client library is included via a <script> tag, and a connection to the /chatHub endpoint is created using HubConnectionBuilder(). The connection.on("ReceiveMessage", ...) function listens for the ReceiveMessage event from the server. When a message is received, a new li element is dynamically added to the messagesList to display it. The connection is established by calling connection.start(). When a user sends a message, the sendMessage() function collects the input and invokes the SendMessage method on the SignalR hub via connection.invoke, which sends the message to the server for broadcasting to other connected clients.
Real-Time Interaction with ChatHub
On the server side, messages are processed by ChatHub and sent back to the clients. This seamless interaction between client and server ensures messages are displayed in real time, with connection.invoke handling outgoing messages and connection.on managing incoming ones.
Restricting Access with Authorization
To ensure only authenticated users can access the chat, the [Authorize] attribute is added to the Razor Page or any other pages requiring protection. This ties into ASP.NET Core’s authorization system and complements the authentication flow used for registration, login, and logout.
After adding [Authorize] to Chat.cshtml modify Login.cshtml.cs to return to /Chat instead of /Index
return Redirect("/Chat");


@page
@model ChatApp.Pages.Chat.ChatModel
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]  // This restricts access to authenticated users

<h2>Chat Room</h2>

<ul id="messagesList">
    @foreach (var message in Model.Messages)
    {
        <li>@message</li>
    }
</ul>

<input type="text" id="userInput" placeholder="Your name" />
<input type="text" id="messageInput" placeholder="Type your message..." />
<button onclick="sendMessage()">Send</button>

<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.0/signalr.min.js"></script>
<script>
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();

    connection.on("ReceiveMessage", function (user, message) {
        const msg = `${user}: ${message}`;
        const li = document.createElement("li");
        li.textContent = msg;
        document.getElementById("messagesList").appendChild(li);
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
    });

    function sendMessage() {
        const user = document.getElementById("userInput").value;
        const message = document.getElementById("messageInput").value;

        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
</script>


Chat Model
The Chat.cshtml page in a Razor Pages application needs a corresponding model (Chat.cshtml.cs) to handle the server-side logic and data associated with the page. While Chat.cshtml contains the view and markup, the model (Chat.cshtml.cs) acts as the PageModel, which is responsible for managing data, handling user interactions, and processing requests. The model also includes methods like OnGet(), which handles the logic for loading or processing data when the page is accessed, and it keeps the logic separated from the presentation layer.
Without a model, Razor Pages wouldn't be able to handle the necessary server-side processing for actions like interacting with databases, or responding to user input, which is essential for the chat functionality.








Chat.cshtml.cs with added logging

using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;


namespace ChatApp.Pages.Chat
{
    public class ChatModel : PageModel
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly ILogger<ChatModel> _logger;

        public List<string> Messages { get; set; }

        // Constructor with Dependency Injection
        public ChatModel(IHubContext<ChatHub> hubContext, ILogger<ChatModel> logger)
        {
            _hubContext = hubContext;
            _logger = logger;

            // Log when the ChatModel is created and show DI object details
            Console.WriteLine("ChatModel has been created.");

            // Log actual object details of IHubContext<ChatHub>
            if (_hubContext != null)
            {
                Console.WriteLine("IHubContext<ChatHub> injected.");
                
                // Show some specific details about the IHubContext<ChatHub> object
                Console.WriteLine("IHubContext<ChatHub> method count: " + _hubContext.GetType().GetMethods().Count());
                Console.WriteLine("IHubContext<ChatHub> type: " + _hubContext.GetType().FullName);
            }
            else
            {
                Console.WriteLine("IHubContext<ChatHub> is null.");
            }

            // Log the logger object itself
            if (_logger != null)
            {
                Console.WriteLine("ILogger<ChatModel> injected.");

                // Show some specific details about the ILogger<ChatModel> object
                Console.WriteLine("ILogger<ChatModel> type: " + _logger.GetType().FullName);
            }

            Messages = new List<string>();
        }

        public void OnGet()
        {
            // Log when OnGet is called
            Console.WriteLine("OnGet called in ChatModel");

            // Example: Adding a message for testing
            Messages.Add("Welcome to the chat room!");

            // Log the state of the messages
            Console.WriteLine($"Messages count: {Messages.Count}");

            // Log if the SignalR hub context is ready to be used
            if (_hubContext != null)
            {
                Console.WriteLine("SignalR context is ready to use.");
                Console.WriteLine("Sending a message to all clients...");

                // Send a message to all connected clients via SignalR
                _hubContext.Clients.All.SendAsync("ReceiveMessage", "Server", "Welcome to the chat!");
            }
            else
            {
                Console.WriteLine("SignalR context is not available.");
            }
        }
    }
}




Both DbContext and IHubContext act as contexts in their respective areas, providing the necessary environment and functionality for their operations.

DbContext is like the "space" where you interact with the database — querying, updating, inserting, and deleting data.

IHubContext is the "space" where you manage real-time communication — sending messages, broadcasting updates, managing connections, and more.


Each "space" serves its purpose, allowing you to work with data (via DbContext) and real-time interactions (via IHubContext) in a structured way. They're both essential for their respective tasks but operate independently in the application.

When you call AddSignalR() in Program.cs or Startup.cs, it automatically registers the necessary SignalR services, including IHubContext<ChatHub>, with the dependency injection (DI) container. This allows you to inject IHubContext<ChatHub> into classes like page models, controllers, or service classes to interact with SignalR hubs, such as sending messages to all connected clients. This implicit registration simplifies the setup, as you don’t need to manually register IHubContext<T> for each hub you define.





Messaging Test

Testing SignalR Dependency Injections (Logs from Chat Model)


The successful exchange of messages between two different browsers logged in as different users demonstrates that SignalR is functioning correctly in your application. When a message is sent from one browser, it is transmitted to the SignalR hub on the server, which then broadcasts it to all connected clients, including the sender and the second browser. This real-time message synchronization confirms that the hub is effectively managing connections and delivering updates across clients as expected.
Outcome 6: Different Users Send and Receive Messages Using Chat Page in Real Time.







Section3 SignalR Integration and Real-Time Chat Recap


The integration of SignalR into the chat application establishes real-time messaging functionality by leveraging the ChatHub as the central communication hub. This hub facilitates seamless communication between the server and connected clients, allowing users to send and receive messages instantly. The flexibility of the hub enables broadcasting to all clients, specific groups (e.g., chat rooms), or individual users, ensuring scalability and versatility.
To enable real-time messaging:
SignalR Setup on the Server:
The ChatHub class defines methods like SendMessage, which handles server-side communication by broadcasting messages to all connected clients using Clients.All.SendAsync("ReceiveMessage", user, message).
SignalR is added to the services in Program.cs using builder.Services.AddSignalR().
Middleware maps the SignalR hub to the /chatHub endpoint with app.MapHub<ChatHub>("/chatHub").
Client-Side Real-Time Interaction:
The Chat.cshtml Razor Page provides the front-end interface for users to send and receive messages. The page connects to the SignalR hub using HubConnectionBuilder() and listens for the ReceiveMessage event via the connection.on method.
Messages sent by users are processed using the sendMessage JavaScript function, invoking the SendMessage method on the SignalR hub.
Authorization for Access Control:
To ensure that only authenticated users can access the chat, the [Authorize] attribute is applied to the Razor Page, integrating seamlessly with ASP.NET Core's authentication and authorization system.
PageModel Logic for Chat.cshtml:
The ChatModel in Chat.cshtml.cs handles server-side logic, such as initializing messages and interacting with the SignalR hub context. Dependency injection of IHubContext<ChatHub> and logging capabilities ensure the hub is properly configured and ready to handle real-time communication.
Testing and Validation:
Messages are sent and received in real-time between different users in multiple browsers, confirming the successful exchange of data and real-time synchronization. Logging provides insights into the behavior and readiness of the hub, ensuring a robust implementation.
This integration results in a fully functional real-time chat application, combining SignalR's capabilities with ASP.NET Core's Razor Pages for a seamless and efficient user experience.
Review of What I've Learned
Throughout this project, I’ve gained a deeper understanding of various web development concepts, particularly in building a real-time messaging application with user authentication. I’ve learned how to implement SignalR for real-time communication, allowing multiple clients to send and receive messages instantly. By setting up ASP.NET Core Identity, I was able to manage user authentication and authorization, ensuring that only authenticated users could access the chat functionality.
Additionally, I’ve become familiar with the fundamentals of Entity Framework Core, learning how to connect a database to an application, perform migrations, and persist data—essential skills for building scalable applications. I also explored Razor Pages for the frontend, which helped me grasp how to structure dynamic pages that interact with backend logic.
Working on this project has enhanced my understanding of dependency injection, middleware configuration, and how to build a seamless flow of communication between the frontend and the backend. It has also helped me become more comfortable with working in a real-time, multi-user environment, which I now recognize as a crucial feature for many modern applications.
In the next article, I plan to build on this project by introducing several new features:
 Persistent Storage for Messages: Currently, my messages are stored in memory or temporarily in the session. I aim to persist them in a database so they can be accessed even after the application restarts. I’ll add a Message entity to the AppDbContext and set up migrations to store messages in my SQLite database, ensuring they are saved permanently.
 Real-time Updates for New Users: I want to enhance the real-time experience by notifying all connected clients when a new user joins or leaves the chat. I’ll create UserJoined and UserLeft events in the SignalR Hub to broadcast these updates to all clients.
 Message Formatting and Rich Media: I plan to allow users to send images, videos, or files within messages. This would involve implementing file upload functionality and sending URLs or file paths to the server, allowing other clients to view or download the media.
 Private Messages: I also want to implement private messaging, allowing users to send messages to each other privately. This will involve modifying the SignalR hub to handle private message channels, where only the sender and the recipient can see the message.
 Message History & Pagination: As the app grows, I plan to implement pagination for message history so that users don’t have to load thousands of messages at once. I could create a "load more messages" feature where users can scroll to the top of the chat and load previous messages in chunks.
User Profiles and Avatars: Another feature I’d like to add is user profiles, which may include custom avatars or display names. These details will be stored in the database and displayed in the chat UI alongside the messages.
Error Handling and Validation: To improve the app’s robustness, I’ll add proper error handling and input validation both on the client and server sides. This will include ensuring messages aren’t empty and handling cases where users disconnect or attempt to send invalid data.
Testing: I plan to implement unit and integration tests for key components of the app using tools like xUnit or NUnit for backend testing, and Selenium or Playwright for frontend testing.
Deploy to Production: Once the app is stable, I’ll look into deploying it to a cloud platform like Azure, AWS, or Heroku. This will involve setting up environment variables and ensuring the database connection string is securely handled.
Security Enhancements: Finally, I will secure the app further by implementing features such as rate-limiting to prevent spam, CSRF protection, and HTTPS for encrypted communication.


