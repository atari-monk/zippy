export class GamepadConnectionTracker {
    private gamepads: (Gamepad | null)[] = [];

    constructor() {
        this.#setupEventListeners();
        this.update();
    }

    #setupEventListeners(): void {
        window.addEventListener("gamepadconnected", (e) => {
            console.log(`Gamepad connected: ${e.gamepad.id}`);
            this.update();
        });

        window.addEventListener("gamepaddisconnected", (e) => {
            console.log(`Gamepad disconnected: ${e.gamepad.id}`);
            this.update();
        });
    }

    update(): void {
        this.gamepads = navigator.getGamepads();
    }

    getGamepad(index: number = 0): Gamepad | null {
        if (index < 0 || index >= this.gamepads.length) {
            return null;
        }
        return this.gamepads[index];
    }

    getConnectedGamepads(): Gamepad[] {
        return Array.from(navigator.getGamepads()).filter(
            (gp) => gp !== null
        ) as Gamepad[];
    }
}
