# %%
import numpy 
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# %%
games = pd.read_csv('games.csv')

# %%
games.head()

# %%
games.shape

# %%
games.describe

# %%
games.duplicated().sum()

# %%
games.info()

# %%
cat_col = [col for col in games.columns if games[col].dtype == 'object']
cat_col

games[cat_col].nunique()

# %%
num_col = [col for col in games.columns if games[col].dtype != 'object']
num_col

games[num_col].nunique()

# %%
df = games.drop(['Estimated owners', 'Full audio languages' ,'Metacritic url', 'Notes', 'Peak CCU', 'DLC count', 'Metacritic score', 'User score', 'Score rank', 'Achievements', 'Recommendations', 'Average playtime forever', 'Average playtime two weeks', 'Median playtime forever', 'Median playtime two weeks'], axis=1)
df.head()

# %%
df.shape

# %%
input_tags = "Indie Action".split()



tfidf_vectorizer = TfidfVectorizer()

tfidf_matrix = tfidf_vectorizer.fit_transform(df['Tags'].values.astype('U'))

tag_vector = tfidf_vectorizer.transform([" ".join(input_tags)])
cosine_similarities = cosine_similarity(tfidf_matrix, tag_vector)

top_n = 10
similar_games_indices = cosine_similarities.flatten().argsort()[-top_n:][::-1]
similiar_games = df.iloc[similar_games_indices]

print("Input tags", input_tags)
print("Similar games")
print(similiar_games[['Name', 'Tags', 'About the game']])


