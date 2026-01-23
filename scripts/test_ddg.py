from langchain_community.tools import DuckDuckGoSearchRun


def test_ddg():
    search = DuckDuckGoSearchRun()
    query = "Dragon Ball Z Budokai Tenkaichi 3 release date"
    print(f"Searching for: {query}")
    try:
        res = search.invoke(query)
        print("--- Results ---")
        print(res)
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    test_ddg()
