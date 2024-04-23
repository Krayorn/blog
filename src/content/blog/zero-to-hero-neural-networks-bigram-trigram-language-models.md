---
title: 'From Zero to Hero - Neural networks: Training a bigram and trigram language models'
description: 'The excercises suggested by Andrej Karpathy in his serie from Zero to Hero, introduction to neural networks: Building Makemore'
pubDate: 2024-03-25
tags: ["AI"]
published: true
---

In this post, you'll follow me along as I accomplish the 5 exercises suggested by [Andrej Karpathy](https://twitter.com/karpathy) in the second video from his series [Neural Networks: from Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ). You can find [the original notebooks from the lectures](https://github.com/karpathy/nn-zero-to-hero/tree/master).

In the video, he builds and explains how to create a bigram language model to generate names. I will not cover everything he explained, and encourage you to go watch it or to shoot me an email (me@krayorn.com) or a Twitter DM if you have any issues.

Here's the state of [my notebook](https://github.com/Krayorn/neural-network-zero-to-hero-exercises/blob/70e383d8d1a2c0b2dba8dd774b48094bd15a7b84/bigrams.ipynb) before starting the exercises.

Let's dive!

## E01: Trigram language model

The first exercise is to create a trigram model instead of the bigram one. By looking at one more character before making a prediction, the model should propose names that sound more real.

Before getting to the good stuff with the neural net, let's make a model based on simple counts from the dataset.

```py
N2 = torch.zeros((27, 27, 27), dtype=torch.int32) # We add one dimension compared to the bigram model
chars = sorted(list(set(''.join(words))))
stoi = {s:i+1 for i,s in enumerate(chars)}
stoi['.'] = 0
itos = {i:s for s,i in stoi.items()}

for w in words:
  chs = ['.'] + list(w) + ['.']
  for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
    ix1 = stoi[ch1]
    ix2 = stoi[ch2]
    ix3 = stoi[ch3]
    N2[ix1, ix2, ix3] += 1

P2 = (N2+1).float()
P2 /= P2.sum(2, keepdims=True) # .sum(2) because we want the third level of the array to be normalized to get the probabilities
```
In the bigram count model, we had an array following this format:
```py
[ 
  a: [a => 0.4, b => 0.6] # We had a probability of 0.4 to get an "a" after an "a"
  b: [a => 0.3, b => 0.7]
] 
```
In our trigram count model, our array now follows this format:
```py
[ 
  a: [
    a: [a => 0.4, b => 0.6] # We had a probability of 0.4 to get an "a" after an "a" after an "a"
    b: [a => 0.3, b => 0.7]
  ]
  b: [
    a: [a => 0.8, b => 0.2]
  ]
] 
```

To verify that we successfully normalized our probabilities, let's check that the sum of all the values in our third level sums to 1.
```py
P2[1, 1].sum() 
# tensor(1.0000) All good !
```

Then we sample from our new probabilities:

```py
g = torch.Generator().manual_seed(2147483647)

for i in range(10):
  out = ['.', '.']
  while True:
    p = P2[stoi[out[-2]], stoi[out[-1]]] # Plug the last two chars into our probabilities table
    ix = torch.multinomial(p, num_samples=1, replacement=True, generator=g).item()
    out.append(itos[ix])
    if ix == 0:
      break
  print(''.join(out))
```
We got these names:
- junide
- ilyasid
- prelay
- ocin
- fairritoper
- sathen
- dannaaryanileniassibduinrwin
- lessiyanayla
- te
- farmumthyfortumj

instead of:
- junide
- janasah
- p
- cony
- a
- nn
- kohin
- tolian
- juee
- ksahnaauranilevias

It seems a tiny bit better (we don't have "a", or "nn" this time), but it's difficult to know by how much, to be honest. The negative_log_likelihood should tell us if those names are more or less likely than the ones before.

```py
# Very similar to how we calculate it for the bigram count model

log_likehood = 0.0
n = 0
for w in words:
  chs = ['.'] + list(w) + ['.']
  for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
    ix1 = stoi[ch1]
    ix2 = stoi[ch2]
    ix3 = stoi[ch3]
    n+=1
    logprob = torch.log(P2[ix1, ix2, ix3])
    log_likehood += logprob

print(f'{log_likehood:.4f}') # -410414.9688
nll = -log_likehood

print(nll / n) # tensor(2.0927)
```
And we got 2.0927 from 2.4544. So it is indeed better! 

Now, let's start the fun stuff! How to do a similar trigram model, using a neural net instead?

```py
# Neural net time

xs, ys = [], []
for w in words:
  chs = ['.'] + list(w) + ['.']
  for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
    ix1 = stoi[ch1]
    ix2 = stoi[ch2]
    ix3 = stoi[ch3]
    xs.append((ix1, ix2)) # We need to keep two chars for the input, so it's an array of tuples instead of simple ints
    ys.append(ix3)

xs = torch.tensor(xs)
ys = torch.tensor(ys)
print("examples", ys.shape[0])

g = torch.Generator().manual_seed(2147483647)
W =  torch.randn((27*2, 27), generator=g, requires_grad=True) 
# Got stuck a bit on this part and didn't realize how many neurons I'd be needing, started with (27x27, 27) but I think this was not necessary
# You just need 27x2, the first 27 will activate for the first input, the second 27 for the second one
# Double the inputs, double the neurons, that makes sense! 
```

On to the training:

```py
for k in range(1000):
  xenc = F.one_hot(xs, num_classes=27).float() # This still works the same, it one_hot both inputs, so you get two times 27 tensors
  
  # .view() is used to change the format of tensors. xenc is currently [examplesCount, 2, 27]
  # and we want [examplesCount, 54] (to match the shape of W [54, 27])
  logits = xenc.view(-1, 27*2) @ W # -1 means we let torch define how much we'll get in the first dimension to stay compatible, in our case it should not change
  counts = logits.exp()
  probs = counts / counts.sum(1, keepdims=True)
  loss = -probs[torch.arange(ys.shape[0]), ys].log().mean() # ys.shape[0] is the number of examples (allows us to avoid using a count variable)

  W.grad = None
  loss.backward()

  W.data += -3 * W.grad

print(loss.item()) # 2.2742
```
After a few passes, we end up with a loss of 2.27, which isn't as good as the trigram count model, but better than the bigram neural net!

## E02: Train, Dev, and Test sets.

Now we'll split the initial dataset into three sets. Train for the training, dev to play around, and test only to evaluate the model.
It's quite easy to create thoses

```py
import random 
import math

random.shuffle(words)

c = len(words)

trainSet = words[:math.floor(c * 0.8)]
devSet = words[math.floor(c*0.8):math.floor(c*0.9)]
testSet = words[math.floor(c*0.9):]
```

And we retrain, on the trainSet
```py
xs, ys = [], []
for w in trainSet:
  # create examples + expectations

# [...] Training steps

print(loss.item()) # 2.2588 I trained more steps than before and ended up with this loss
```

If we then evaluate this model on the other two sets

```py
# Let's check the loss for the testSet && devSet ? 
lossi = []
for w in testSet:
  chs = ['.'] + list(w) + ['.']
  for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
    ix1 = stoi[ch1]
    ix2 = stoi[ch2]
    ix3 = stoi[ch3]
      
    xenc = F.one_hot(torch.tensor((ix1, ix2)), num_classes=27).float()
    logits = xenc.view(-1, 27*2) @ W
    counts = logits.exp()
    probs = counts / counts.sum(1, keepdims=True)
    lossi.append(-probs[0, ix3].log())
print(torch.tensor(lossi).mean()) ## 2.2615 similar than training set

lossi = []
for w in devSet:
  chs = ['.'] + list(w) + ['.']
  for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
    ix1 = stoi[ch1]
    ix2 = stoi[ch2]
    ix3 = stoi[ch3]
      
    xenc = F.one_hot(torch.tensor((ix1, ix2)), num_classes=27).float()
    logits = xenc.view(-1, 27*2) @ W
    counts = logits.exp()
    probs = counts / counts.sum(1, keepdims=True)
    lossi.append(-probs[0, ix3].log())
print(torch.tensor(lossi).mean()) ## 2.2584 similar as well
```

The losses are very similar, which means that the model is not overfitting.

## E03: Adjusting the smoothness

```py
# Let's now adjust the smoothing
# On a model trained on the count, it's increasing the count of everything. 
# On the Neural net, you need to touch the loss a tiny bit.

smoothnesses = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 1.0]

for i, smoothness in enumerate(smoothnesses):
    W =  torch.randn((27*2, 27), generator=g, requires_grad=True)
    for k in range(1000):
      xenc = F.one_hot(xs, num_classes=27).float()
      logits = xenc.view(-1, 27*2) @ W
      counts = logits.exp()
      probs = counts / counts.sum(1, keepdims=True)
      loss = -probs[torch.arange(ys.shape[0]), ys].log().mean() + smoothness*(W**2).mean()
      
      W.grad = None
      loss.backward()
    
      W.data += -3 * W.grad
    
    print(f"Smoothness: {smoothness} => loss train set: {loss.item()}")

    lossi = []
    for w in devSet:
      chs = ['.'] + list(w) + ['.']
      for ch1, ch2, ch3 in zip(chs, chs[1:], chs[2:]):
        ix1 = stoi[ch1]
        ix2 = stoi[ch2]
        ix3 = stoi[ch3]
          
        xenc = F.one_hot(torch.tensor((ix1, ix2)), num_classes=27).float()
        logits = xenc.view(-1, 27*2) @ W
        counts = logits.exp()
        probs = counts / counts.sum(1, keepdims=True)
        lossi.append(-probs[0, ix3].log())
    print(f"Smoothness: {smoothness} => loss dev set: {torch.tensor(lossi).mean()}")
    print()

## Increasing the smoothing is giving worse results on the training set. But a small smoothness reduced a tiny amount of the dev set loss initially when running 1000 loops of backward propagation
## I guess it's helping the model not fit too much to the training data and therefore getting a bit better overall. 
```

```
Smoothness: 0 => loss train set: 2.2822558879852295
Smoothness: 0 => loss dev set: 2.283693313598633

Smoothness: 0.01 => loss train set: 2.2934107780456543
Smoothness: 0.01 => loss dev set: 2.2820634841918945

Smoothness: 0.02 => loss train set: 2.3001441955566406
Smoothness: 0.02 => loss dev set: 2.2821156978607178

Smoothness: 0.05 => loss train set: 2.318838357925415
Smoothness: 0.05 => loss dev set: 2.282914876937866

Smoothness: 0.1 => loss train set: 2.341620922088623
Smoothness: 0.1 => loss dev set: 2.284518003463745

Smoothness: 0.25 => loss train set: 2.39310359954834
Smoothness: 0.25 => loss dev set: 2.3002421855926514

Smoothness: 0.5 => loss train set: 2.4549922943115234
Smoothness: 0.5 => loss dev set: 2.332789659500122

Smoothness: 1.0 => loss train set: 2.5460662841796875
Smoothness: 1.0 => loss dev set: 2.389799118041992
```

## E04: Taking index from weights instead of using F.one_hot

Well, I didn't really manage to accomplish this one! I found a way to avoid using the one_hot function, but I'm not just taking one row from W. Will leave this here in case someone wants to explain to me what was supposed to be done! 

```py
# I don't understand how you're supposed to do it, I thought the target was to use something like W[xs.magic()] to avoid the matrix multiplication, 
# but I didn't manage to make it work, after checking some other repositories online I found this one: https://github.com/JonathanSum/NLP-Notebooks-Andrej-Course/blob/main/ngram.ipynb
# where the author instead recreated a tensor of the same format as xenc after a one_hot but without needing the one hot.
# This will do for now I guess !?

xenc_pre = torch.zeros(*xs.shape, 27)
xenc_pre[torch.arange(xs.shape[0]), 0, xs[:,0]] = 1
xenc_pre[torch.arange(xs.shape[0]), 1, xs[:,1]] = 1
```

## E04: Using F.cross_entropy

Finally, let's use cross_entropy instead of doing some calculations ourselves, it's quite straightforward, it takes the logits and the expected integers and calculates the loss!

```py
# Using F.cross_entropy, we get the same results

xenc = F.one_hot(xs, num_classes=27).float()
logits = xenc.view(-1, 27*2) @ W

counts = logits.exp()
probs = counts / counts.sum(1, keepdims=True)
loss = -probs[torch.arange(ys.shape[0]), ys].log().mean() + 0.01*(W**2).mean()

loss, F.cross_entropy(logits, ys) + 0.01*(W**2).mean() # Don't forget the smoothing !
```

## Conclusion

Here is my [github](https://github.com/Krayorn/neural-network-zero-to-hero-exercises) with the different steps.

With the lectures and now the exercises, I'm starting to understand a lot more how everything works, can't wait to go deeper in the lectures, but I'll try to do the exercises from micrograd first! 