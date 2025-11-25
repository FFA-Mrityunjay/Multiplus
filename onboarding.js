class Onboarding {
    constructor(steps = []) {
        this.steps = steps;
        this.currentStep = 0;

        /* Change 1: Added fade-in transition and opacity for smooth animation */
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
            opacity: 0;               /* change */
            transition: opacity 0.3s ease; /* change */`;

        document.body.appendChild(this.container);

        /* Change 2: Start fade-in animation */
        setTimeout(() => (this.container.style.opacity = 1), 10);

        this.render();
    }

    render() {
        this.container.innerHTML = "";

        const box = document.createElement("div");
        box.style =
            `background: #fff;
            padding: 32px;
            width: 350px;
            border-radius: 12px;
            position: relative;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);`;

        /* Change 3: Added close/skip button */
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
        controls.style =
            "display: flex; justify-content: space-between; margin-top: 20px;";

        const nextButton = document.createElement("button");
        nextButton.innerText =
            this.currentStep === this.steps.length - 1 ? "Finish" : "Next";

        /* Change 4: Styled next button more cleanly */
        nextButton.style =
            "padding: 10px 18px; background:#007bff; color:#fff; border:none; border-radius:8px;";
        nextButton.onclick = () => this.nextStep();

        box.appendChild(title);
        box.appendChild(desc);
        box.appendChild(controls);
        controls.appendChild(nextButton);

        /* Change 5: Show Back button only when needed */
        if (this.currentStep > 0) {
            const backButton = document.createElement("button");
            backButton.innerText = "Back";
            backButton.style =
                "padding: 10px 18px; background:#ccc; color:#000; border:none; border-radius:8px;";
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
        /* Change 6: Add fade-out animation before removing */
        this.container.style.opacity = 0;
        setTimeout(() => {
            this.container.remove();
            if (typeof this.onComplete === "function") {
                this.onComplete();
            }
        }, 300);
    }
}
