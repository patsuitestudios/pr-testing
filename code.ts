interface Greeting {
    message: string;
    emoji: string;
    period: string;
}

function getTimePeriod(hour: number): string {
    if (hour >= 5 && hour < 12) return "mooooorning";
    if (hour >= 12 && hour < 17) return "afternooooooon";
    if (hour >= 17 && hour < 21) return "eeeeeevening";
    return "niiiiiight";
}

function getGreeting(period: string): Greeting {
    const greetings: Record<string, Greeting> = {
        mooooorning: {
            message: "Good mooooorning! Rise and shine",
            emoji: "☀️",
            period: "mooooorning",
        },
        afternooooooon: {
            message: "Good afternooooooon! Hope your day is going well",
            emoji: "🌤️",
            period: "afternooooooon",
        },
        eeeeeevening: {
            message: "Good eeeeeevening! Time to wind down",
            emoji: "🌅",
            period: "eeeeeevening",
        },
        niiiiiight: {
            message: "Hello niiiiiight owl! Burning the midniiiiiight oil",
            emoji: "🌙",
            period: "niiiiiight",
        },
    };
    return greetings[period];
}

function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minutes}:${seconds} ${ampm}`;
}

function formatDate(date: Date): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function buildBanner(lines: string[]): string {
    const maxLen = Math.max(...lines.map((l) => l.length));
    const border = "═".repeat(maxLen + 4);
    const top = `╔${border}╗`;
    const bottom = `╚${border}╝`;
    const padded = lines.map((line) => {
        const padding = " ".repeat(maxLen - line.length);
        return `║  ${line}${padding}  ║`;
    });
    return [top, ...padded, bottom].join("\n");
}

function main() {
    const now = new Date();
    const period = getTimePeriod(now.getHours());
    const greeting = getGreeting(period);

    const lines = [
        `${greeting.emoji}  ${greeting.message}!`,
        "",
        `Time : ${formatTime(now)}`,
        `Date : ${formatDate(now)}`,
        "",
        `It's currently ${period} where you are.`,
    ];

    console.log(buildBanner(lines));
}

main();
