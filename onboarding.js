// onboarding.js

class Onboarding {
    constructor(steps = []) {
        this.steps = steps;
        this.currentStep = 0;

        // Create onboarding container
        this.container = document.createElement("div");
        this.container.id = "onboarding-container";
        this.container.style =
            `position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            z-index: 9999;`;

        document.body.appendChild(this.container);
        this.render();
    }

    render() {
        this.container.innerHTML = "";

        const box = document.createElement("div");
        box.style =
            `background: #fff;
            padding: 30px;
            width: 350px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);`;

        const title = document.createElement("h2");
        title.innerText = this.steps[this.currentStep].title;

        const desc = document.createElement("p");
        desc.innerText = this.steps[this.currentStep].description;

        const controls = document.createElement("div");
        controls.style = "display: flex; justify-content: space-between; margin-top: 20px;";

        const nextButton = document.createElement("button");
        nextButton.innerText = this.currentStep === this.steps.length - 1 ? "Finish" : "Next";
        nextButton.style = "padding: 10px 18px; background:#007bff; color:#fff; border:none; border-radius:8px;";

        nextButton.onclick = () => this.nextStep();

        box.appendChild(title);
        box.appendChild(desc);
        box.appendChild(controls);
        controls.appendChild(nextButton);

        if (this.currentStep > 0) {
            const backButton = document.createElement("button");
            backButton.innerText = "Back";
            backButton.style = "padding: 10px 18px; background:#ccc; color:#000; border:none; border-radius:8px;";
            backButton.onclick = () => this.prevStep();
            controls.insertBefore(backButton, nextButton);
        }

        this.container.appendChild(box);
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.render();
        } else {
            this.complete();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
        }
    }

    complete() {
        this.container.remove();
        if (typeof this.onComplete === "function") {
            this.onComplete();
        }
    }
}

    // ✅ Simple alert function
    showAlert() {
        alert("This is onboarding.js file.");
}

Usage example:
const onboarding = new Onboarding([
    { title: "Welcome!", description: "Thanks for joining our platform." },
    { title: "Profile Setup", description: "Let’s set up your profile." },
    { title: "All Done!", description: "You’re ready to go" }
]);

onboarding.onComplete = () => console.log("Onboarding finished!");
