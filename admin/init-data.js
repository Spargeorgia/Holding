// Initialize existing news data
const existingNews = [
    {
        id: 1,
        title: "გლობალური მარკეტინგული კამპანიის დაწყება",
        department: "Marketing",
        description: "კომპანიამ დაიწყო ახალი გლობალური მარკეტინგული კამპანია, რომელიც მიზნად ისახავს ბრენდის ცნობადობის გაზრდას საერთაშორისო ბაზრებზე.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-01"
    },
    {
        id: 2,
        title: "ციფრული პლატფორმის განახლება",
        department: "IT",
        description: "კომპანიის ციფრული პლატფორმა განახლდა ახალი ფუნქციონალით, რაც უზრუნველყოფს უკეთეს მომხმარებელთა გამოცდილებას.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-02"
    },
    {
        id: 3,
        title: "მიწოდების ჯაჭვის ოპტიმიზაცია",
        department: "Retail",
        description: "კომპანიამ დაასრულა მიწოდების ჯაჭვის ოპტიმიზაციის პროექტი, რაც გააუმჯობესებს პროდუქციის მიწოდების ეფექტურობას.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-03"
    },
    {
        id: 4,
        title: "კომპანია ხსნის ახალ ფლაგმან სუპერმარკეტს",
        department: "Retail",
        description: "კომპანია ხსნის ახალ ფლაგმან სუპერმარკეტს თბილისის ცენტრში, რომელიც იქნება ყველაზე დიდი და თანამედროვე მაღაზია ქსელში.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-03"
    },
    {
        id: 5,
        title: "კომპანია 14 მილიონ ევროზე მეტს აინვესტირებს ქვეყნის მასშტაბით",
        department: "Finance",
        description: "კომპანია აცხადებს ახალი საინვესტიციო გეგმის შესახებ, რომელიც მოიცავს 14 მილიონ ევროზე მეტ ინვესტიციას სხვადასხვა რეგიონში.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-03"
    },
    {
        id: 6,
        title: "პარტნიორი ანახლებს სუპერმარკეტების ქსელს",
        department: "Retail",
        description: "ჩვენი პარტნიორი კომპანია იწყებს მასშტაბურ განახლებას სუპერმარკეტების ქსელში, რაც გააუმჯობესებს მომხმარებელთა მომსახურებას.",
        imageUrl: "https://placehold.co/600x400",
        date: "2025-11-04"
    }
];

// Check if news already exist in localStorage
if (!localStorage.getItem('siteNews')) {
    localStorage.setItem('siteNews', JSON.stringify(existingNews));
}