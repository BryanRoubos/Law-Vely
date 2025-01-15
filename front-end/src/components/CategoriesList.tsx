function CategoriesList() {
    const categoryList = ["Contracts", "Torts", "Family Law", "Property Law", "Labour Law", "Consumer Protection", "Wills & Estates", "Personal Injury", "Dispute Resolution", "Civil Rights"]

    return (
        <aside className="bg-purple-500 text-white p-4 w-full md:w-1/4">
            <ul className="space-y-4">
                {categoryList.map((category, index) => (
                    <li key={index} className="text-lg font-bold">
                    {category}
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategoriesList;