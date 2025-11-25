class Onboarding {
    constructor(steps = []) {
        this.steps = steps;
        this.currentStep = 0;

        // CREATE OVERLAY CONTAINER (CHANGE 1)
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

        // SMOOTH FADE-IN ANIMATION (CHANGE 2)
        setTimeout(() => (this.container.style.opacity = 1), 10);

        this.render();
    }

    render() {
        this.container.innerHTML = "";

        // MAIN CARD
        const box = document.createElement("div");
        box.style =
            `background: #fff;
            padding: 30px;
            width: 350px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            position: relative;`;

        // CLOSE (SKIP) BUTTON (CHANGE 3)
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

        // NEXT BUTTON
        const nextButton = document.createElement("button");
        nextButton.innerText =
            this.currentStep === this.steps.length - 1 ? "Finish" : "Next";
        nextButton.style =
            "padding: 10px 18px; background:#007bff; color:#fff; border:none; border-radius:8px;";
        nextButton.onclick = () => this.nextStep();

        controls.appendChild(nextButton);

        // BACK BUTTON
        if (this.currentStep > 0) {
            const backButton = document.createElement("button");
            backButton.innerText = "Back";
            backButton.style =
                "padding: 10px 18px; background:#ccc; color:#000; border:none; border-radius:8px;";
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

    // NEW METHOD: JUMP TO ANY STEP (CHANGE 4)
    goToStep(stepNumber) {
        if (stepNumber >= 0 && stepNumber < this.steps.length) {
            this.currentStep = stepNumber;
            this.render();
        } else {
            console.warn("Invalid step index.");
        }
    }

    complete() {
        // FADE OUT
        this.container.style.opacity = 0;

        setTimeout(() => {
            this.container.remove();
            if (typeof this.onComplete === "function") {
                this.onComplete();
            }
        }, 300);
    }

    // SIMPLE ALERT METHOD (CHANGE 5)
    showAlert(message = "This is onboarding.js file.") {
        alert(message);
    }
}

// =====================
// USAGE EXAMPLE
// =====================
const onboarding = new Onboarding([
    { title: "Welcome!", description: "Thanks for joining our platform." },
    { title: "Profile Setup", description: "Let’s set up your profile." },
    { title: "All Done!", description: "You’re ready to go!" }
]);

onboarding.onComplete = () => console.log("Onboarding finished!");

// Example: Jump to step 2 directly
// onboarding.goToStep(1);
