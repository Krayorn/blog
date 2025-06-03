---
title: 'My real-life AI dev workflow'
description: 'Some details on my AI dev workflow, without the hype'
pubDate: 2025-06-02
tags: ["AI", "software"]
---

Over the past few months, I’ve pushed myself to use AI more in my daily dev work. This is a retrospective: what’s working, what’s not, and what I'll try next.

I consider myself in the boring "middle ground". I use AI daily and have some good results, but nowhere near what I read constantly online. I'm sure part of that is just a skill issue, but I believe the hype (especially on Twitter) is out of control and sets unrealistic expectations for a lot of use cases.
But I'm really happy with what I get from it, and I would be sad to see those tools go, so I also believe people who claim AI can't do shit are lying to themselves. 

My setup is simple: I'm using ChatGPT+ and Cursor.

## Familiar codebase changes

When I need to update something in a codebase I'm very familiar with, like an edge case or a feature change, I'll simply link the files to modify to Cursor and let the Agent Mode handle the changes. 

If I'm not sure how this part of the codebase is currently working or organized, I rarely rely on the Cursor Agent Mode to change it because it makes code reviews messy and it's very easy to miss important side effects.
So I'll be reading through everything, making sure I understand it, and then start making the change by hand and then leverage the Cursor autocomplete to speed up the implementation, or move back to the chat and Agent Mode if there's a lot of code to write now that I know what to expect.

## New features: small vs big projects

In a smaller codebase, I'll guide the AI a lot, by prompting it to make small changes at a time (i.e.: only creating the model class first, then adding a few routes, then connecting it in the frontend). Between each prompt, I might edit a lot of the code to make it as clean as I want to.

In bigger codebases, I simply reference other files with the standard I want and then let the AI handle the basics on its own. 

In both cases, once the scaffolding and main utilities are completed, I usually jump in and use the autocomplete to finish tying everything together.

## Throwable script

One of the nicest things is asking the AI to write a throw-away script I'll need only once. I boot up ChatGPT, give my specs, and most times that's it, it's done and works well.

To give a concrete example, here's one of the prompts I sent to the chat last week:

> I have two sqlite .db files, they should be almost the same, but one of them has one column less in one table. i'd like to copy all the data from certain tables from one to the other, how would I do that ?

Tbh, when reading that again, this prompt sucked, and I would totally forgive most people if they don't totally get what I wanted. It spat this script

```
import sqlite3

# Set your paths
source_db_path = 'source.db'
target_db_path = 'target.db'
tables_to_copy = ['your_table1', 'your_table2']  # Add table names you want to copy

def get_table_columns(conn, table_name):
    cursor = conn.execute(f'PRAGMA table_info({table_name})')
    return [row[1] for row in cursor.fetchall()]

def copy_table_data(src_conn, tgt_conn, table_name):
    src_columns = get_table_columns(src_conn, table_name)
    tgt_columns = get_table_columns(tgt_conn, table_name)

    # Determine common columns
    common_columns = list(set(src_columns) & set(tgt_columns))
    if not common_columns:
        print(f"No matching columns in table '{table_name}'")
        return

    common_columns_str = ', '.join(common_columns)
    placeholders = ', '.join(['?'] * len(common_columns))

    cursor = src_conn.execute(f'SELECT {common_columns_str} FROM {table_name}')
    rows = cursor.fetchall()

    if rows:
        tgt_conn.executemany(
            f'INSERT INTO {table_name} ({common_columns_str}) VALUES ({placeholders})',
            rows
        )
        tgt_conn.commit()
        print(f"Copied {len(rows)} rows into '{table_name}'")

def main():
    with sqlite3.connect(source_db_path) as src_conn, sqlite3.connect(target_db_path) as tgt_conn:
        for table in tables_to_copy:
            copy_table_data(src_conn, tgt_conn, table)

if __name__ == '__main__':
    main()
```

I edited the `tables_to_copy` and the two db paths, ran it, and rm-ed the script because it was done. I'd have managed without the AI but this let me move on to more interesting stuff in a few minutes.

## Documentation

ChatGPT is also my doc guy, I think I could do it in Cursor, but I prefer to do my research in the browser. I still read a lot of docs, but when I have some broader questions, asking ChatGPT saves me a ton of time by giving me the keywords or the concepts that are relevant to my question. I then sometimes go back and forth between the chat and official docs to ask clarifying questions and read some specs + examples. 
If I don't like the documentation for the technology I'm asking questions about, I just stay in ChatGPT and have it give me code examples.

## What I'm not doing

Just as important as what I use AI for, is when I don't use it.

### The AI does not refactor for me

I don't ask the AI to refactor some code, I may drop a file in ChatGPT and ask for a review, but I'll handle most of the changes myself, that's my way of keeping in touch with the codebase.

Refactors usually happen when a feature that seemed simple turns out to be tricky, something the AI doesn't really know.

If I know exactly what I want to change, I'll do the same things as mentioned in the **Familiar codebase changes** section

### I don't use cursorrules

Cursorrules are files you can create in a project to automatically give context to the assistant, but I never use them.

I tried to add one to one of my projects but then never felt the need to add or write more. Maybe as my usage of the tool increases I'll find some things that I could add to the general context of the AI but so far, nothing.

### I don't have special prompts

I don't vibe code, I vibe prompt. I'm very careful with every line of code changed by the AI, but I don't reuse carefully crafted prompts, it feels like a bit of a waste of time. I just ask for some changes and drop the context in the chat. If it doesn't work, I just restore the checkpoint, add more context, or reduce the size of the task until it works or until I decide I'm bored and write part of it myself. 

## Next

I'm still very much exploring those AI tools, I'll keep ramping up my usage of them when that makes sense. Obviously, the goal is to do faster stuff I don't like to do so that I can spend more time doing things I want to do. If I find that my preferences or experiences change in the future, I'll be sure to revisit this post and write a follow-up.