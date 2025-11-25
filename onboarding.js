// onboarding.js

class Onboarding {
    constructor(steps = []) {
        this.steps = steps;
        this.currentStep = 0;

        // CHANGE 1 ➤ Overlay container
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
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;`;

        document.body.appendChild(this.container);

        // CHANGE 2 ➤ Fade-in animation
        setTimeout(() => this.container.style.opacity = 1, 10);

        this.render();
    }

    render() {
        this.container.innerHTML = "";

        // Main box
        const box = document.createElement("div");
        box.style =
            `background: #fff;
            padding: 30px;
            width: 350px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            position: relative;`;

        // CHANGE 3 ➤ Close button
        const closeBtn = document.createElement("div");
        closeBtn.innerText = "✕";
        closeBtn.style =
            `position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 16px;
            color: #999;`;
        closeBtn.onclick = () => this.complete();
        box.appendChild(closeBtn);

        const title = document.createElement("h2");
        title.innerText = this.steps[this.currentStep].title;

        const desc = document.createElement("p");
        desc.innerText = this.steps[this.currentStep].description;

        const controls = document.createElement("div");
        controls.style = "display: flex; justify-content: space-between; margin-top: 20px;";

        // CHANGE 4 ➤ Next button text changed for conflict
        const nextButton = document.createElement("button");
        nextButton.innerText = this.currentStep === this.steps.length - 1 ? "Done" : "Next Step";
        nextButton.style = "padding: 10px 18px; background:#007bff; color:#fff; border:none; border-radius:8px;";
        nextButton.onclick = () => this.nextStep();

        controls.appendChild(nextButton);

        // Back button
        if (this.currentStep > 0) {
            const backButton = document.createElement("button");
            backButton.innerText = "Back";
            backButton.style = "padding: 10px 18px; background:#ccc; color:#000; border:none; border-radius:8px;";
            backButton.onclick = () => this.prevStep();
            controls.insertBefore(backButton, nextButton);
        }

        box.appendChild(title);
        box.appendChild(desc);
        box.appendChild(controls);

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

    // CHANGE 5 ➤ complete() function modified for conflict
    complete() {
        console.log("Onboarding completed! (Feature/Prachi)");
        this.container.style.opacity = 0;
        setTimeout(() => {
            this.container.remove();
            if (typeof this.onComplete === "function") this.onComplete();
        }, 300);
    }

    // CHANGE 6 ➤ showAlert modified for conflict
    showAlert(message = "This is Feature/Prachi version of onboarding.js") {
        alert(message);
    }

    // CHANGE 7 ➤ New method to jump to a specific step
    goToStep(stepNumber) {
        if (stepNumber >= 0 && stepNumber < this.steps.length) {
            this.currentStep = stepNumber;
            this.render();
        } else {
            console.warn("Invalid step index.");
        }
    }
}

// =====================
// Usage Example
// =====================
const onboarding = new Onboarding([
    { title: "Welcome!", description: "Thanks for joining our platform." },
    { title: "Profile Setup", description: "Let’s set up your profile." },
    { title: "All Done!", description: "You’re ready to go!" }
]);

onboarding.onComplete = () => console.log("Onboarding finished!");

// Example: Jump to step 2 directly
// onboarding.goToStep(1);
